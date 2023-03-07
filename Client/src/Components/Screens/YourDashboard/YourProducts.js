import React, {useState, useEffect,useContext} from 'react'
import ShopItem from '../Shop/ShopItem';
import AdminContext from '../Admin/context/AdminContext';
const YourProducts = () => {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const { farmerProducts, fetchfarmerproducts } = useContext(AdminContext);
    useEffect(
      () => {
        fetchfarmerproducts();
      }, // eslint-disable-next-line 
      []
    );
  
      const filteredProducts =
    selectedCategory === "All"
      ? farmerProducts
      : farmerProducts.filter((product) => product.category === selectedCategory);

      const ReverseArray=[];
      const length=filteredProducts.length;
      for (let index = length-1; index >=0; index--) {
        ReverseArray.push(filteredProducts[index]);   
      }
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (event) => {
    event.preventDefault();
    setSearchTerm(event.target.value);
    setSearchResults(
      farmerProducts.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };
  const handleFilterClick = (category) => {
    setSelectedCategory(category);
  };
  return (
<>
      <div className="container2">
        <div className="row2">
        <div className="col-md-2 collection section">
        <div className="title">
              <span >Search Your Item</span>
            </div>
            <div className="input-field1">
              <i className="bx bxs-search"  style={{color:"#c0e6ba"}}></i>
              <input
                type="text"
                placeholder="Search"
                name="search"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            <div className="title"  style={{marginTop:"25%", marginLeft:"-10%"}}> 
              <span style={{ marginRight: "2rem" }}>Categories</span>
            </div>
            <div className="filters">
              <div
                style={{ marginBottom: "1rem" }}
                data-filter="All"
                className={selectedCategory === "All" ? "active" : ""}
                onClick={() => handleFilterClick("All")}
              >
                All
              </div>
              <div
                style={{ marginBottom: "1rem" }}
                data-filter="Vegetables"
                className={selectedCategory === "Vegetables" ? "active" : ""}
                onClick={() => handleFilterClick("Vegetables")}
              >
                Vegetables
              </div>
              <div
                style={{ marginBottom: "1rem" }}
                data-filter="Fruits"
                className={selectedCategory === "Fruits" ? "active" : ""}
                onClick={() => handleFilterClick("Fruits")}
              >
                Fruits
              </div>
              <div
                style={{ marginBottom: "1rem" }}
                data-filter="Pesticides"
                className={selectedCategory === "Pesticides" ? "active" : ""}
                onClick={() => handleFilterClick("Pesticides")}
              >
                Pesticides
              </div>
              <div
                style={{ marginBottom: "1rem", marginRight: "4rem" }}
                data-filter="Machinery"
                className={selectedCategory === "Machinery" ? "active" : ""}
                onClick={() => handleFilterClick("Machinery")}
              >
                Machinery
              </div>
            </div>
          </div>
        <div className="col-md-10 section">
            <div className="title">
              <span>Your All Products</span>
            </div>
            <div className="row2">
              <div className="container3 mx-1">
                {farmerProducts.length === 0 && "No products to display"}
              </div>

              {searchTerm === ""
                ? ReverseArray.map((item) => {
                    return (
                      <ShopItem
                        key={item.id}
                        item={item}
                      />
                    );
                  })
                : searchResults.map((item) => {
                    return (
                      <ShopItem
                        key={item.id}
                        item={item}
                      />
                    );
                  })}
            </div>
          </div>
          </div>
      </div>
</>
  )
}

export default YourProducts
