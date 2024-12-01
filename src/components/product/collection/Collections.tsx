import React, { useEffect, useState } from "react";

import DropdownIcon from "../../../assets/images/dropdown_icon.png";
import { getAllProducts } from "../util/productHttp.ts";
import { Product } from "../../../types/Product.ts";
import { useLoaderData } from "react-router-dom";
import LatestCollectionItem from "../latest/LatestCollectionItem.tsx";

const Collections = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [collectionList, setCollectionList] = useState<Product[]>([]);
  const [filterOptions, setFilterOptions] = useState<string[]>([]);
  const [filterTypeOptions, setFilterTypeOptions] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>("relevant");

  const loaderData = useLoaderData() as Product[];

  useEffect(() => {
    if (loaderData.length > 0) {
      setCollectionList(loaderData);
    }
  }, []);

  useEffect(() => {
    let filteredList: Product[] = [];
    let filteredOnTypeList: Product[] = [];

    if (filterOptions.length === 0) {
      return setCollectionList(loaderData);
    }

    filterOptions.forEach((filterOption) => {
      loaderData.filter((product) => {
        if (filterOption === product.category) {
          filteredList.push(product);
        }
      });
    });

    filterTypeOptions.forEach((typeFilter) => {
      filteredList.filter((product) => {
        if (product.subCategory === typeFilter) {
          filteredOnTypeList.push(product);
        }
      });

      return setCollectionList(sortProducts(filteredOnTypeList));
    });

    if (filterTypeOptions.length === 0) {
      setCollectionList(sortProducts(filteredList));
    }
  }, [filterOptions, filterTypeOptions]);

  function onFilterClicked() {
    if (showFilter === false) {
      return setShowFilter(true);
    }
    setShowFilter(false);
  }

  function onFilterCategoriesClicked(event) {
    if (!filterOptions.includes(event.target.id)) {
      setFilterOptions((previousState) => {
        return [...previousState, event.target.id];
      });
    } else {
      const removedFromList = filterOptions.filter((option) => {
        if (option !== event.target.id) {
          return option;
        }
      });
      setFilterOptions(removedFromList);
    }
  }

  function onFilterTypeClicked(event) {
    if (!filterTypeOptions.includes(event.target.id)) {
      setFilterTypeOptions((previousState) => {
        return [...previousState, event.target.id];
      });
    } else {
      const removedFromList = filterTypeOptions.filter((option) => {
        if (option !== event.target.id) {
          return option;
        }
      });
      setFilterTypeOptions(removedFromList);
    }
  }

  function onSortByClicked(event) {
    if (event.target.value !== sortBy) {
      setSortBy(event.target.value);

      if (event.target.value === "relevant") {
        setCollectionList(collectionList.sort());
      }
    }
  }

  function sortProducts(products: Product[]): Product[] {
    let sortedList: Product[] = [];
    if (sortBy === "relevant") {
      let productIds = products.map((product) => {
        return product.id;
      });

      productIds.sort((a, b) => {
        return a - b;
      });

      productIds.forEach((id) => {
        products.forEach((product) => {
          if (product.id === id) {
            sortedList = [...sortedList, product];
          }
        });
      });
    }

    //Figure out a way to sort from low to high and from high to low
    else if (sortBy === "lowtohigh") {
    }

    return sortedList;
  }

  return (
    <div className="grid grid-cols-[1fr,3fr] gap-[3rem] h-fit w-full max-sm:block">
      <div className="flex flex-col gap-[1rem] h-fit w-full mb-[1rem]">
        <div className="inline-flex h-[5vh] w-full">
          <div className="flex items-center h-full w-fit">
            <h1 className="font-bold">FILTERS</h1>
          </div>
          <div className="flex h-full items-center pl-[1rem] hidden max-sm:flex">
            <img
              className={`h-3 ${showFilter && "rotate-90"}`}
              src={DropdownIcon}
              alt={DropdownIcon}
              onClick={onFilterClicked}
            />
          </div>
        </div>
        <div
          className={`flex flex-col w-full h-fit pb-[1rem] border-[1px] border-gray-300 pl-[1rem] pt-[1rem] gap-[0.5rem] ${
            !showFilter ? "max-sm:hidden" : "max-sm:visible"
          }`}
        >
          <h2 className="text-sm font-bold">CATEGORIES</h2>
          <div className="inline-flex gap-[0.5rem]">
            <input
              type="checkbox"
              value="men"
              id="Men"
              onClick={onFilterCategoriesClicked}
            />
            <p className="text-sm">Men</p>
          </div>
          <div className="inline-flex gap-[0.5rem]">
            <input
              type="checkbox"
              value="women"
              id="Women"
              onClick={onFilterCategoriesClicked}
            />
            <p className="text-sm">Women</p>
          </div>
          <div className="inline-flex gap-[0.5rem]">
            <input
              type="checkbox"
              value="kids"
              id="Kids"
              onClick={onFilterCategoriesClicked}
            />
            <p className="text-sm">Kids</p>
          </div>
        </div>
        <div
          className={`flex flex-col w-full h-fit border-[1px] border-gray-300 pl-[1rem] pt-[1rem] gap-[0.5rem] pb-[1rem] ${
            !showFilter ? "max-sm:hidden" : "max-sm:visible"
          }`}
        >
          <h2 className="text-sm font-bold">Type</h2>
          <div className="inline-flex gap-[0.5rem]">
            <input
              type="checkbox"
              value="Topwear"
              id="Topwear"
              onChange={onFilterTypeClicked}
            />
            <p className="text-sm">Topwear</p>
          </div>
          <div className="inline-flex gap-[0.5rem]">
            <input
              type="checkbox"
              value="Bottomwear"
              id="Bottomwear"
              onClick={onFilterTypeClicked}
            />
            <p className="text-sm">Bottomwear</p>
          </div>
        </div>
      </div>
      <div className="h-fit w-full">
        <div className="flex w-full h-[10vh]">
          <div className="h-full basis-3/4 max-sm:basis-1/2">
            <h1>
              ALL <strong>COLLECTIONS</strong>
            </h1>
          </div>
          <div className="h-full basis-1/4 max-sm:basis-1/2">
            <select
              className="h-1/2 w-full text-sm pl-[0.5rem] border-2 border-gray-300"
              name="sort"
              id="sort"
              onClick={onSortByClicked}
            >
              <option value="relevant">Sort by: Relevant</option>
              <option value="lowtohigh">Sort by: Low to High</option>
              <option value="hightolow">Sort by: High to Low</option>
            </select>
          </div>
        </div>
        <div className="flex flex-wrap w-full h-fit">
          {collectionList.map((product, index) => {
            return (
              <LatestCollectionItem
                key={index}
                id={product.id}
                image={product.images[0]}
                name={product.name}
                price={product.price}
                product={product}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Collections;

export async function loader(): Promise<Product[]> {
  const response = await getAllProducts();

  return response;
}
