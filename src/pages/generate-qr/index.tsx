import { ArrowBack } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CenteringContainer from "../../components/CenteringContainer";
import useApi from "../../hooks/useApi";
import { useEventStore } from "../../states/event-store";
import { StyledBox, StyledPaper } from "./styles";

export default function GenerateQr() {
  const { event } = useEventStore();
  const navigate = useNavigate();

  const QR = useApi
    .qr()
    .generate(`${import.meta.env.VITE_CLIENT_URL}/blessings/${event.id}`);

  return (
    <StyledBox>
      <Button
        onClick={() => navigate("/dashboard")}
        startIcon={<ArrowBack fontSize="small" />}
        sx={{ alignItems: "flex-start" }}
      >
        Overview
      </Button>
      <CenteringContainer>
        <StyledPaper>
          <Typography variant="h2" textAlign="center">
            {event.name}
          </Typography>
          <img src={QR} alt="QR_CODE" title="QR" />
          <Typography variant="caption">
            Scan the QR code to participate
          </Typography>
        </StyledPaper>
      </CenteringContainer>
    </StyledBox>
  );
}
