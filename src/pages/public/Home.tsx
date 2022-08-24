import React, { useState } from "react";
import { BiPaste } from "react-icons/bi";
import {
  Grid,
  Spinner,
  Square,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Text,
  Button,
  InputGroup,
  InputRightElement,
  Image,
} from "@chakra-ui/react";
import QRCode from "react-qr-code";
import { toast } from "react-toastify";
import { useWhatsAppHook } from "../../hooks/useWhatsappHook";

export const Home: React.FC = () => {
  const {
    qrcode,
    loading,
    sessionAuthenticated,
    getSessionWhatsApp,
    startSessionWhatsApp,
  } = useWhatsAppHook();

  const [companyToken, setCompanyToken] = useState(
    localStorage.getItem("@waapi:token") || ""
  );

  async function handleStartSessionWhatsapp() {
    if (!companyToken || companyToken.trim().length === 0) {
      toast.warn("Por favor informe o token da empresa !!!");
      return;
    }

    if (sessionAuthenticated) {
      toast.success("Sua sessão do WhatsApp já está ativa !!!");
      return null;
    }

    localStorage.setItem("@waapi:token", companyToken);

    await getSessionWhatsApp(companyToken);

    const timeoutFunction = setTimeout(async () => {
      await getSessionWhatsApp(companyToken);
    }, 30000);

    if (sessionAuthenticated) {
      clearTimeout(timeoutFunction);
    }

    if (!sessionAuthenticated) {
      await startSessionWhatsApp(companyToken);
    }
  }

  function handleCopyText() {
    if (!companyToken || companyToken.trim().length === 0) {
      toast.warn("O campo Token está vazio !!!");
      return;
    }

    navigator.clipboard.writeText(companyToken);

    toast.success("Token copiado com sucesso");
  }

  return (
    <Grid
      w={"100%"}
      h={"100vh"}
      backgroundColor={"blackAlpha.100"}
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Grid
        w={"1000px"}
        h={"450px"}
        backgroundColor={"white"}
        boxShadow={"2xl"}
        borderRadius={"20px"}
        display={"flex"}
        flexDirection={"row"}
        alignItems={"center"}
      >
        <Grid
          w={"60%"}
          h={"100%"}
          mr={"23px"}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Grid
            w={"80%"}
            minH={"150px"}
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
          >
            <Text fontSize={"3xl"} fontWeight={"bold"}>
              RocketApps WA-API
            </Text>
            <Text fontSize={"sm"} mt={"10px"} textAlign={"center"}>
              Com nossa api você poderá enviar e receber mensagem através do
              WhatsApp sem nenhuma dificuldade
            </Text>

            <Text fontSize={"sm"} mt={"10px"} textAlign={"center"}>
              Acesse nossa documentação.{"  "}
              <a
                href="http://wadoc.rocketapps.dev/"
                target="_blank"
                rel="noreferrer"
              >
                <b>Clique aqui!</b>
              </a>
            </Text>
          </Grid>

          <Grid w={"80%"}>
            <FormControl>
              <FormLabel>Token</FormLabel>
              <InputGroup>
                <Input
                  pr="4.5rem"
                  type="text"
                  value={companyToken}
                  onChange={(event) => setCompanyToken(event.target.value)}
                />
                <InputRightElement width="4.5rem">
                  <Button
                    h="1.75rem"
                    size="sm"
                    onClick={() => handleCopyText()}
                  >
                    <BiPaste />
                  </Button>
                </InputRightElement>
              </InputGroup>
              <FormHelperText>
                Ainda não possui um token?{" "}
                <a href={"/register"} target={"_self"}>
                  <b>Clique aqui!</b>
                </a>
              </FormHelperText>
            </FormControl>
          </Grid>

          <Grid
            w={"80%"}
            mt={"20px"}
            display={"flex"}
            flexDirection={"row-reverse"}
          >
            <Button
              w={"120px"}
              disabled={loading}
              colorScheme="green"
              onClick={() => handleStartSessionWhatsapp()}
            >
              {loading ? (
                <Spinner
                  thickness="4px"
                  speed={"0.65s"}
                  emptyColor="gray.200"
                  color="#FFF"
                  size="md"
                />
              ) : (
                "Iniciar Sessão"
              )}
            </Button>
          </Grid>

          <Grid w={"80%"} mt={"20px"} display={"flex"} flexDirection={"column"}>
            <Text fontSize={"sm"} fontWeight={"bold"} textAlign={"center"}>
              contato@rocketapps.dev
            </Text>
            <Text fontSize={"sm"} fontWeight={"bold"} textAlign={"center"}>
              (62) 9.8305-5581
            </Text>
          </Grid>

          <Grid w={"80%"} mt={"30px"} display={"flex"} flexDirection={"column"}>
            <Text fontSize={"xs"} textAlign={"center"}>
              Versão: v0.0.1 - Atualização 23/08/2022
            </Text>
          </Grid>
        </Grid>

        <Square
          size={"330px"}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          boxShadow={"base"}
          borderRadius={"10px"}
        >
          {!qrcode ? (
            <Image src={require("../../assets/images/Whatsapp_37229.png")} />
          ) : loading ? (
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="rgb(43, 108, 176)"
              size="xl"
            />
          ) : (
            <QRCode size={256} value={qrcode} />
          )}
        </Square>
      </Grid>
    </Grid>
  );
};
