import { Container, IconButton, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { GiMaterialsScience } from "react-icons/gi";
import React from "react";

const ButtonContainerSx = {
  display: "flex",
  padding: "5px",
};

const CardCollectionManager: React.FC = () => {
  return (
    <Container
      disableGutters
      sx={{
        position: "absolute",
        height: "100%",
        width: "150px",
        backgroundColor: "#7C6C9E",
      }}
    >
      <Container sx={ButtonContainerSx}>
        <IconButton>
          <MenuIcon sx={{ backgroundColor: "pink", fontSize: "40px" }} />
        </IconButton>
        <Typography fontSize="30px"> 100</Typography>
      </Container>
      <Container sx={ButtonContainerSx}>
        <IconButton>
          <GiMaterialsScience color="white" size="30px" />
        </IconButton>
        <Typography fontSize="30px"> 100</Typography>
      </Container>
      <Container sx={ButtonContainerSx}>
        <IconButton>
          <GiMaterialsScience color="white" size="30px" />
        </IconButton>
        <Typography fontSize="30px"> 100</Typography>
      </Container>
      <Container sx={ButtonContainerSx}>
        <IconButton>
          <GiMaterialsScience color="white" size="30px" />
        </IconButton>
        <Typography fontSize="30px"> 100</Typography>
      </Container>
    </Container>
  );
};

export default CardCollectionManager;
