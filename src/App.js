import "./App.css";
import { useState } from "react";

// This is country data set for search country
const countryData = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "India",
];

// This is product data set for search product for selected country
const productData = [
  {
    Afghanistan: ["Hoodie", " Beanie", " Belt", " Cap", " Sunglasses", "Album"],
  },
  {
    Albania: ["Hoodie", " Beanie", " Belt", " Cap", " Sunglasses", "Album"],
  },
  {
    Algeria: ["Hoodie", " Beanie", " Belt", " Cap", " Sunglasses", "Album"],
  },
  {
    Andorra: ["Hoodie", " Beanie", " Belt", " Cap", " Sunglasses", "Album"],
  },
  {
    Angola: ["Hoodie", " Beanie", " Belt", " Cap", " Sunglasses", "Album"],
  },
  {
    India: ["Shoe", "Laptop", "Phone", "Chocolate"],
  },
];

function App() {
  // This state variable for search
  const [query, setQuery] = useState("");
  // This state variable for show full entered value in the input field
  const [searchFullText, setSearchFullText] = useState("");
  // This state variable for store array to search, initial state is set country data.
  const [data, setData] = useState(countryData);

  // This function is for make word's first character Capital letter.
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  // This funtion for handle the input value
  const handleSearch = (value) => {
    // First check input value is empty or not
    if (value?.trim()?.length > 0) {
      setSearchFullText(value);
      // Here check last entered character is space or not. If space entered then set query state empty and set data  state to country because after space we need to check first country suggestion.
      if (value.charAt(value.length - 1) === " ") {
        setQuery("");
        setData(countryData);
        // Here check last entered value is dot(.) or not.
      } else if (value.charAt(value.length - 1) === ".") {
        // here the logic is for get product data for particular country and set data state to that product data.
        productData.reduce((arr, o) => {
          return Object.keys(o).reduce((a, b) => {
            if (b.toLowerCase() === query) {
              setData(o?.[capitalizeFirstLetter(query)]);
            }
          }, arr);
        }, []);
      } else {
        let k = value.toLowerCase().split(" ");
        let spaceArray = value.toLowerCase().split(" ");
        // Here check last word entered is dot(.) or not.
        if (spaceArray[spaceArray.length - 1].includes(".")) {
          let dotArray = spaceArray[spaceArray.length - 1].split(".");
          setQuery(dotArray[dotArray.length - 1]);
        } else setQuery(spaceArray[spaceArray.length - 1]);
      }
    } else {
      setSearchFullText("");
      setQuery("");
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <input
        placeholder="Enter"
        value={searchFullText}
        onChange={(event) => handleSearch(event.target.value)}
        style={{
          width: "200px",
          padding: "5px",
          outline: "none",
          borderRadius: "5px",
        }}
      />
      <div
        style={{
          border: "1px solid #000",
          padding: "0",
          width: "200px",
        }}
      >
        {query &&
          data
            ?.filter((item) =>
              item?.toLowerCase()?.includes(query.toLowerCase())
            )
            .map((item, index) => {
              return (
                <div
                  key={index}
                  style={{ borderBottom: "1px solid #333", padding: "5px" }}
                >
                  <p>{item}</p>
                </div>
              );
            })}
      </div>
    </div>
  );
}

export default App;
