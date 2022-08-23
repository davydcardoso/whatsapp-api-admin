import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  Input,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { toast } from "react-toastify";
import { useWhatsAppHook } from "../../hooks/useWhatsappHook";

export const CreateAccount: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const { loading, registerAccount } = useWhatsAppHook();

  async function handleCreateAccount() {
    if (loading) {
      toast.warn("Por favor aguarde");
      return;
    }

    if (!name || name.trim().length < 3 || name.trim().length > 255) {
      toast.warn("Por favor digite um nome valido !!");
      return;
    }

    if (!email || email.trim().length < 3 || email.trim().length > 255) {
      toast.warn("Por favor digite um e-mail valido !!");
      return;
    }

    await registerAccount({ name, email });
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
        w={"40%"}
        h={"80%"}
        p={"10px"}
        backgroundColor={"white"}
        boxShadow={"2xl"}
        borderRadius={"20px"}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
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
            Cadastre-se para poder ter acesso livre aos nossos serviços
          </Text>
        </Grid>

        <Grid w={"80%"}>
          <FormControl>
            <FormLabel>Seu nome</FormLabel>
            <Input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
            <FormLabel mt={"10px"}>Seu E-mail</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <FormHelperText mt={"20px"}>
              Já possui conta?{" "}
              <a href={"/"} target={"_self"}>
                Login!
              </a>
            </FormHelperText>
          </FormControl>
        </Grid>

        <Grid
          w={"80%"}
          mt={"40px"}
          display={"flex"}
          flexDirection={"row-reverse"}
        >
          <Button
            w={"100px"}
            disabled={loading}
            colorScheme="blue"
            onClick={() => handleCreateAccount()}
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
              "Registrar"
            )}
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};
