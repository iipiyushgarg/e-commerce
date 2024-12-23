import React from "react";
import { Box, Card, CardContent, Skeleton } from "@mui/material";

const SkeletonView: React.FC = () => {
  return (
    <Box>
      <Card sx={{ height: "100%", minHeight: 200 }}>
        <Skeleton variant="rectangular" width="100%" height={60} />
        <CardContent>
          <Skeleton variant="text" />
        </CardContent>
      </Card>
    </Box>
  );
};

export default SkeletonView;
