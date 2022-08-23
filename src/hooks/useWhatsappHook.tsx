import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { useCallback, useState } from "react";
import { generate as generateCPF } from "gerador-validador-cpf";

import { api } from "../services/api";

export type RegisterAccountProps = {
  name: string;
  email: string;
};

type RegisterAccountResponse = {
  token: string;
};

type ErrorResponse = {
  error: string;
};

type GetSessionWhatsAppResponse = {
  actived: boolean;
  authenticated: boolean;
  createdAt: Date;
  qrcode: string;
  updatedAt: Date;
  companyId: string;
  companySecret: string;
};

export const useWhatsAppHook = () => {
  const [qrcode, setQrcode] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [sessionAuthenticated, setSessionAuthenticated] = useState(false);

  const registerAccount = useCallback(
    async ({ name, email }: RegisterAccountProps) => {
      setLoading(true);
      try {
        const response = await api.post("/companies/", {
          name,
          email,
          document: generateCPF(),
          phones: ["62983000081"],
        });

        setLoading(false);

        if (response.status === 201) {
          const { token } = response.data as RegisterAccountResponse;

          localStorage.setItem("@waapi:token", token);

          toast.success(
            "Sua conta foi criada com sucesso, você sera redirecionado para a pagina principal, lembre-se de salvar seu token em um local seguro",
            {
              onClose: () => {
                setTimeout(() => {
                  window.location.href = "/";
                }, 3000);
              },
            }
          );
        }
      } catch (err: any) {
        setLoading(false);

        const axiosError = err as AxiosError;

        if (axiosError.response) {
          const data = axiosError.response.data as ErrorResponse;

          console.log(axiosError.status, axiosError.response);

          toast.error(data.error);

          return;
        }

        toast.error(`Erro ao criar uma conta | Detalhes: ${err.message}`);
      }
    },
    []
  );

  const getSessionWhatsApp = useCallback(async (token: string) => {
    setLoading(true);
    try {
      const response = await api.get("/whatsapp/session/", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setLoading(false);

      if (response.status === 200) {
        const {
          actived,
          authenticated,
          qrcode: QrCode,
        } = response.data as GetSessionWhatsAppResponse;

        localStorage.setItem("@waapi:session-status", String(actived));
        localStorage.setItem(
          "@waapi:session-authenticated",
          String(authenticated)
        );
        localStorage.setItem("@waapi:session-qrcode", QrCode);

        setSessionAuthenticated(authenticated);
        setQrcode(QrCode);

        if (authenticated) {
          toast.success("Sua sessão do WhatsApp já está ativa !!!");
          return;
        }
      }
    } catch (err: any) {
      setLoading(false);

      const axiosError = err as AxiosError;

      if (axiosError.response) {
        const data = axiosError.response.data as ErrorResponse;

        console.log(axiosError.status, axiosError.response);

        toast.error(data.error);

        return;
      }

      toast.error(`Erro ao criar uma conta | Detalhes: ${err.message}`);
    }
  }, []);

  const startSessionWhatsApp = useCallback(async (token: string) => {
    setLoading(true);
    try {
      const response = await api.post("/whatsapp/session/start", undefined, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        toast.success(
          "Sua sessão está sendo inicializada, logo o qrcode estará disponivel, por favor aguarde !!!"
        );
      }
    } catch (err: any) {
      setLoading(false);

      const axiosError = err as AxiosError;

      if (axiosError.response) {
        const data = axiosError.response.data as ErrorResponse;

        console.log(axiosError.status, axiosError.response);

        toast.error(data.error);

        return;
      }

      toast.error(`Erro ao criar uma conta | Detalhes: ${err.message}`);
    }
  }, []);

  return {
    qrcode,
    loading,
    sessionAuthenticated,
    registerAccount,
    getSessionWhatsApp,
    startSessionWhatsApp,
  };
};
