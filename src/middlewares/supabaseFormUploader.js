import { createClient } from "@supabase/supabase-js";
import formidable from "formidable";
import fs from "fs";

// Create a single supabase client for interacting with your database
const supabase = createClient(process.env.SUPABASE_DOMAIN, process.env.SUPABASE_SERVICE_ROLE_KEY);

export default function supabaseFormUploader(fieldName) {
  const handler = (req, res, next) => {
    const form = new formidable.IncomingForm();

    try {
      form.parse(req, async function (err, fields, files) {
        let filepath = "";

        if (files?.image) {
          const fileName =
            Date.now() + "-" + files.image.originalFilename.toLowerCase().split(" ").join("-");
          filepath = `uploads/${fileName}`;
          filepath = filepath.replace(/\s/g, "-");
          const rawData = fs.readFileSync(files.image.filepath);

          await supabase.storage.from(process.env.SUPABASE_BUCKET).upload(filepath, rawData, {
            contentType: files.image.mimetype,
          });
        }

        req.body = {
          ...fields,
          ...(!!files?.image && { image: filepath }),
        };

        next();
      });
    } catch (e) {
      console.log(e);
    }
  };

  return handler;
}
