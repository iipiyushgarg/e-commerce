import {
  Chip,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import ProductFilter from "../Product-filter";
import { useGetPostsQuery } from "../../Services/api";
import SkeletonView from "./skeleton-view";
import DialogModal from "../../Components/Dialog-modal";
import ProductDetail from "../Product-detail";

export interface Post {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: { rate: number; count: number };
}

const ProductList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<Post>();
  const [limit, setLimit] = useState<number>(5);
  const [price, setPrice] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [rating, setRating] = useState<number>();
  const [isOpenModal, setOpenModal] = useState<boolean>(false);
  const {
    data = [],
    isLoading,
    isFetching,
  } = useGetPostsQuery({ limit, category });

  useEffect(() => {
    if (data.length) setPosts(data);
  }, [data]);

  useEffect(() => {
    const updatedData = price
      ? [...data].sort((a, b) => {
          if (price === "descending") return b.price - a.price;
          return a.price - b.price;
        })
      : data;

    setPosts(updatedData);
  }, [price, data]);

  return (
    <Box>
      <Typography
        variant="h4"
        sx={{ bgcolor: "primary.dark", textAlign: "center" }}
        color="white"
      >
        Product List
      </Typography>

      <Box
        display="flex"
        justifyContent={{ xs: "center", sm: "flex-end" }}
        gap={0.5}
        flexWrap="wrap"
        my={1}
      >
        <ProductFilter
          type="Category"
          options={[]}
          onChange={(value) => {
            setLimit(5);
            setCategory(typeof value === "string" ? value : value.toString());
          }}
          value={category ?? ""}
        />
        <ProductFilter
          type="Price"
          options={["ascending", "descending"]}
          onChange={(value) =>
            setPrice(typeof value === "string" ? value : value.toString())
          }
          value={price ?? ""}
        />
        <ProductFilter
          type="Rating"
          options={[
            ...new Set(
              posts.map((post) => post.rating.rate).sort((a, b) => b - a)
            ),
          ]}
          onChange={(value) =>
            setRating(typeof value === "string" ? parseFloat(value) : value)
          }
          value={rating ?? ""}
        />
      </Box>
      <Box>
        <Box
          display="grid"
          gridTemplateColumns={{
            xs: "repeat(2, 1fr)",
            sm: "repeat(4, 1fr)",
            md: "repeat(5, 1fr)",
          }}
          gap={1}
        >
          {posts
            .filter((e) => (rating ? e.rating.rate === rating : e))
            .map((post: Post) => (
              <Box key={post.id}>
                <Card
                  sx={{ height: "100%", cursor: "pointer" }}
                  onClick={() => {
                    setSelectedArticle(post);
                    setOpenModal(true);
                  }}
                >
                  <CardMedia
                    component="img"
                    height="164"
                    loading="lazy"
                    sx={{ objectFit: "contain" }}
                    image={post.image}
                    alt={post.title}
                  />
                  <CardContent>
                    <Typography
                      display="block"
                      variant="caption"
                      fontWeight={600}
                      width="100%"
                    >
                      {post.title}
                    </Typography>
                    <Chip
                      label={`$${post.price}`}
                      color="primary"
                      size="small"
                    />
                  </CardContent>
                </Card>
              </Box>
            ))}

          {!posts.length && !isLoading && (
            <Typography>No Data Found...</Typography>
          )}

          {isLoading &&
            Array.from({ length: 4 }).map((_, index) => (
              <SkeletonView key={index} />
            ))}
        </Box>

        <Box textAlign="center" mt={2}>
          {!isLoading && limit < 20 && (
            <Button
              variant="contained"
              disabled={isFetching}
              onClick={() => setLimit(limit + 5)}
            >
              {isFetching ? "Loading" : "Load More"}
            </Button>
          )}
        </Box>
      </Box>

      <DialogModal isOpen={isOpenModal} closeModal={setOpenModal}>
        <ProductDetail data={selectedArticle} />
      </DialogModal>
    </Box>
  );
};

export default ProductList;
