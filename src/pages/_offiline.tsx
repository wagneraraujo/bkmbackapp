import Head from "next/head";
import { Container, Heading, Text, Box, Image } from "@chakra-ui/react";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Você está offline</title>
      </Head>

      <Box>
        <Box
          paddingTop={"32"}
          paddingBottom={"12"}
          paddingX={"6"}
          bg={"#F55D24"}
          bgImg={"/backgroundtop.png"}
          backgroundBlendMode={"multiply"}
        >
          <Image src="/Logo_bkm_app.png" alt="Bkm" />
        </Box>
        <Container padding={6}>
          <Heading color={"#575757"}>Você está offline</Heading>
          <Text fontSize="xl" color={"#575757"}>
            Conecte-se na internet
          </Text>
        </Container>
      </Box>
    </div>
  );
}
