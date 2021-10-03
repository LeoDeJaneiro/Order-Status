import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import styled from "styled-components";

const Quantity = styled.span`
  margin: 0 5px;
`;

const cardCSS = {
  display: "flex",
  justifyContent: "space-between",
  height: 50,
  margin: "5px 0",
};
const boxCSS = { display: "flex", flexDirection: "column" };
const contentCSS = { flex: "1" };
const mediaCSS = { width: 50, height: 50 };

const Product = ({ img, title, quantity }) => (
  <Card sx={cardCSS}>
    <Box sx={boxCSS}>
      <CardContent sx={contentCSS}>
        {title}
        <Quantity>{quantity}x</Quantity>
      </CardContent>
    </Box>
    <CardMedia component="img" sx={mediaCSS} image={img} />
  </Card>
);

export default Product;
