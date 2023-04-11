import { Card, Heading, Image, Text, VStack } from "@chakra-ui/react";
import Link from "next/link";

export default function Books({ id, title, author, image, publisher, year }) {
  return (
    <Link href={`/books/${id}`}>
      <Card key={id} my={4} p={4} cursor="pointer">
        <VStack>
          <Heading size={"md"}>
            {title} ({year})
          </Heading>
          <Text>{author}</Text>
          <Image
            w={24}
            h={24}
            src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${image}`}
            alt={`${id}-${title}`}
          />
          <Text>
            <span>Publisher: </span>
            {publisher}
          </Text>
        </VStack>
      </Card>
    </Link>
  );
}
