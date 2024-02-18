import { ArrowBack, Close, Search, Sort } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  MenuItem,
  Paper,
  Select,
  TextField,
  styled,
} from "@mui/material";
import { useState } from "react";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#eeeeee",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  display: "flex",
}));

export default function TableMenu({ setValues, allEmps }) {
  const [visible, setVisible] = useState(() => false);
  const [searchType, setSearchType] = useState(() => "name");
  const [value, setValue] = useState(() => "");
  const [searched, setSearched] = useState(() => "");

  function search() {
    if (value === "") return;
    if (searchType === "name") {
      setValues((prevValues) =>
        prevValues.filter(
          (val) => val.first_name.toLowerCase() === value.toLowerCase()
        )
      );
    }
    if (searchType === "ph") {
      setValues((prevValues) =>
        prevValues.filter((val) => Number(val.mobile_no) === Number(value))
      );
    }
    setSearched(true);
  }

  function clearSearch() {
    setValues((prevValues) => (prevValues = allEmps));
    setValue("");
    setSearched(false);
  }

  return (
    <Item sx={{ width: "80%", px: 3 }}>
      {visible && (
        <>
          <Box
            display="flex"
            gap={3}
            width="100%"
            justifyContent="center"
            alignItems="center"
            flexWrap="wrap"
          >
            <Box
              sx={{
                display: "flex",
              }}
            >
              <IconButton onClick={() => setVisible(false)}>
                <ArrowBack />
              </IconButton>
              <Select
                size="small"
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)}
              >
                <MenuItem value="name">Seach by first name</MenuItem>
                <MenuItem value="ph">Search by phone number</MenuItem>
              </Select>
            </Box>
            <TextField
              autoFocus
              variant="standard"
              placeholder="Search here..."
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
              }}
              InputProps={{
                endAdornment: (
                  <>
                    {value && (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setValue("")}>
                          <Close />
                        </IconButton>
                      </InputAdornment>
                    )}
                  </>
                ),
              }}
            />
            <Button
              size="small"
              color="inherit"
              variant="outlined"
              onClick={search}
            >
              Search
            </Button>
            {searched && (
              <Button
                size="small"
                color="inherit"
                variant="outlined"
                onClick={clearSearch}
              >
                Clear
              </Button>
            )}
          </Box>
        </>
      )}
      {!visible && (
        <Box
          ml="auto"
          alignItems="center"
          gap={3}
          sx={{
            display: "flex",
          }}
        >
          <IconButton onClick={() => setVisible(!visible)}>
            <Search />
          </IconButton>
          <IconButton>
            <Sort />
          </IconButton>
        </Box>
      )}
    </Item>
  );
}
