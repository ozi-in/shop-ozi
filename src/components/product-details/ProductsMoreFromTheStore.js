import { useEffect, useState } from "react";
import useGetMoreFromStores from "../../api-manage/hooks/react-query/product-details/useGetMoreFromStore";
import { CustomStackFullWidth } from "../../styled-components/CustomStyles.style";
import ProductCard from "../cards/ProductCard";
import H1 from "../typographies/H1";

const ProductsMoreFromTheStore = ({ productDetails }) => {
  const [offSet, setOffSet] = useState(1);
  const [moreItem, setMoreItem] = useState([]);
  const [containsSameProduct, setContainSameProduct] = useState(false);

  const limit = 10;
  const pageParams = {
    productId: productDetails?.id,
    offset: offSet,
    limit: limit,
  };
  //   const handleSuccess = (res) => {
  //     if (res) {
  //       setMoreItem(res);
  //     }
  //   };
  const handleSuccess = (res) => {
    if (res) {
      setMoreItem(res);
      moreItem.slice(0, 4).map((item, index) => {
        if (item?.id === productDetails?.id) {
          setContainSameProduct(true);
        }
      });
    }
  };
  const { refetch } = useGetMoreFromStores(pageParams, handleSuccess);
  useEffect(() => {
    refetch();
  }, []);

  return (
    <CustomStackFullWidth>
      <H1 textAlign="start" text="Suggested Products!" component="h2" />
      {/* {moreItem?.slice(0, 4)?.map((item, index) => {
        return (
          <ProductCard
            item={item}
            key={index}
            cardWidth="350px"
            cardheight="160px"
            horizontalcard="true"
            cardFor="popular items"
          />
        );
      })} */}
      {moreItem?.slice(0, containsSameProduct ? 5 : 4)?.map((item, index) => {
        return productDetails?.id === item?.id ? (
          <></>
        ) : (
          <ProductCard
            item={item}
            key={index}
            cardWidth="350px"
            cardheight="160px"
            horizontalcard="true"
            cardFor="popular items"
          />
        );
      })}
    </CustomStackFullWidth>
  );
};

ProductsMoreFromTheStore.propTypes = {};

export default ProductsMoreFromTheStore;
