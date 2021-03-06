import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  FormLabel,
  Grid,
  TextField,
  RadioGroup,
  Radio,
  FormControlLabel,
  Stack,
} from "@mui/material";
import SideBar from "../../components/header";
import DashboardToolbar from "../../components/toolbar";
import useApi from "../../hooks/useApi";
import { useForm } from "../../hooks/useForm";
import { useEventStore } from "../../states/event-store";
import { Event, EventTypes } from "../../types/event";
import { ButtonContainer, StyledGridItem } from "./styles";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { errorProps } from "../../utils/error-msg.props";

const EditEvent = () => {
  const { event } = useEventStore();

  const handleSubmit = async () => {
    try {
      await useApi.events().create(values!);
    } catch (err) {
      Swal.fire({
        icon: "error",
        ...errorProps,
      });
    }
  };
  const { onChange, onSubmit, values } = useForm<Event>(handleSubmit, event!);

  return (
    <>
      <SideBar />
      <Stack sx={{ pt: 5, pr: 2, flexGrow: 1 }}>
        <DashboardToolbar />
        <form autoComplete="off" onSubmit={onSubmit} noValidate>
          <Card sx={{ mt: 5 }}>
            <CardHeader
              title="Event settings"
              subheader="You can change the any of the events settings here"
            ></CardHeader>
            <Divider />
            <CardContent>
              <Grid container spacing={3}>
                <StyledGridItem>
                  <TextField
                    fullWidth
                    label="Event name"
                    name="name"
                    required
                    variant="outlined"
                    onChange={onChange}
                    value={values.name}
                  />
                </StyledGridItem>
                <StyledGridItem>
                  <TextField
                    fullWidth
                    label="Guests"
                    name="guests"
                    required
                    variant="outlined"
                    onChange={onChange}
                    value={values.estimatedGuests}
                  />
                </StyledGridItem>
                <StyledGridItem>
                  <FormControl>
                    <FormLabel>Event type</FormLabel>
                    <RadioGroup
                      row
                      sx={{ pl: 1 }}
                      name="type"
                      onChange={onChange}
                      value={values.type}
                    >
                      {Object.keys(EventTypes).map((type) => (
                        <FormControlLabel
                          key={type}
                          value={type}
                          control={<Radio />}
                          label={type}
                        />
                      ))}
                    </RadioGroup>
                  </FormControl>
                </StyledGridItem>
              </Grid>
            </CardContent>
            <Divider />
            <ButtonContainer>
              <Button color="primary" variant="contained">
                Save changes
              </Button>
            </ButtonContainer>
          </Card>
        </form>
      </Stack>
    </>
  );
};

export default EditEvent;
