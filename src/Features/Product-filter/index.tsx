import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useGetCategoriesQuery } from "../../Services/api";

interface ProductFilterProps {
  type: string;
  value: string | number;
  onChange: (value: string | number) => void;
  options: Array<string | number>;
}

const ProductFilter: React.FC<ProductFilterProps> = ({
  type,
  options,
  onChange,
  value,
}) => {
  const [filterValues, setFilterValues] = useState<(string | number)[]>([]);
  const { data = [] } = useGetCategoriesQuery(
    {},
    { skip: type !== "Category" }
  );

  useEffect(() => {
    if (type === "Category") {
      if (data.length) setFilterValues(data);
    } else {
      setFilterValues(options);
    }
  }, [data, type, options]);

  return (
    <FormControl sx={{ minWidth: 110 }} size="small">
      <InputLabel id={`${type}-select-label`}>{type}</InputLabel>
      <Select
        labelId={`${type}-select-label`}
        id={`${type}-select`}
        value={value}
        onChange={(e: SelectChangeEvent<string | number>) =>
          onChange(e.target.value)
        }
        label="Catgeory"
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {filterValues.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default ProductFilter;
