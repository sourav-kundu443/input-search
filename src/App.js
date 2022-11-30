import "./App.css";
import { useState } from "react";

const coutryData = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Bangladesh",
];

const productData = [
  {
    Afghanistan: ["Hoodie", " Beanie", " Belt", " Cap", " Sunglasses", "Album"],
  },
  {
    Angola: ["Hoodie", " Beanie", " Belt", " Cap", " Sunglasses", "Album"],
  },
  {
    Bangladesh: ["A", "B", "C", "D", "E", "F"],
  },
];

function App() {
  const [query, setQuery] = useState("");
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState(coutryData);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const handleSearch = (value) => {
    let countryName = "";
    let newQuery = "";
    if (value.trim().length > 0) {
      if (value?.toLowerCase().includes(".")) {
        newQuery = value.toLowerCase().split(".")[1];
        console.log({ newQuery });
        if (newQuery == "") {
          console.log("jjjjj");
          countryName = value.toLowerCase().split(".")[0];
          let firstLetterCap = capitalizeFirstLetter(countryName);

          productData.reduce((arr, o) => {
            return Object.keys(o).reduce((a, k) => {
              if (k.toLowerCase() === countryName) {
                setData(o?.[firstLetterCap]);
              }
            }, arr);
          }, []);
        }
      } else {
        newQuery = value;
        console.log("false");
      }
    } else {
      newQuery = "";
      setData(coutryData);
    }
    setQuery(newQuery);
    setSearchText(value);
  };

  console.log(data);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <input
        placeholder="Enter Post Title"
        value={searchText}
        onChange={(event) => handleSearch(event.target.value)}
      />
      {searchText &&
        query &&
        data
          ?.filter((item) => item?.toLowerCase()?.includes(query.toLowerCase()))
          .map((item, index) => {
            console.log(item);
            return (
              <div key={index}>
                <p
                // onClick={() => {
                //   setQuery(item);
                // }}
                >
                  {item}
                </p>
              </div>
            );
          })}
    </div>
  );
}

export default App;
