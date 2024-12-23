import { Box, CardContent, CardMedia, Rating, Typography } from "@mui/material";
import { Post } from "../Product-list";

interface ProductDetailProps {
  data?: Post;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ data }) => {
  return (
    data && (
      <Box>
        <CardMedia
          component="img"
          height="164"
          loading="lazy"
          sx={{ objectFit: "contain" }}
          image={data.image}
          alt={data.title}
        />
        <CardContent
          sx={{
            "& > p": {
              display: "grid",
              gap: 1,
              gridTemplateColumns: {
                xs: "2.5fr 5fr",
                sm: "1.5fr 5fr",
                lg: "1fr 5fr",
              },
              alignItems: "flex-start",
              fontWeight: 600,
            },
          }}
        >
          <Typography variant="body2">
            Title:{" "}
            <Typography fontWeight={600} variant="body2">
              {data.title}
            </Typography>
          </Typography>
          <Typography variant="body2">
            Price:{" "}
            <Typography fontWeight={600} color="error">
              ${data.price}
            </Typography>
          </Typography>
          <Typography variant="body2">
            Category: <Typography variant="body2">{data.category}</Typography>
          </Typography>
          <Typography variant="body2">
            Description:{" "}
            <Typography variant="caption">{data.description}</Typography>
          </Typography>
          <Typography variant="body2">
            Rating:{" "}
            <Rating
              name="text-feedback"
              value={data.rating.rate}
              readOnly
              precision={0.5}
            />
          </Typography>
        </CardContent>
      </Box>
    )
  );
};

export default ProductDetail;
