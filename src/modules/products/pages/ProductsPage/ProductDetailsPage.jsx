import { useParams } from "react-router-dom";
import { useProducts } from "../../hooks/ui/useProducts";
import axios from "axios";
import * as S from "./ProductDetailsPage.styles";
import {
  Truck,
  ShieldCheck,
  RefreshCw,
  Award,
} from "lucide-react";
import { useAddToCartMutation } from "../../../cart/hooks/api/useCartMutations";

export default function ProductDetailsPage() {
  const { id } = useParams();

  const { products, isLoading } = useProducts(100);
  const addToCartMutation = useAddToCartMutation();

  const product = products?.find(
    (item) => item.id === Number(id)
  );
    const handleAddToCart = () => {
      addToCartMutation.mutate({
        productId: product.id,
        quantity: 1,
      });
    };
  const handlePayment = async () => {
    try {
      const response = await axios.post(
         "http://127.0.0.1:8000/create-payment-order",
        {
          amount: product.price,
        }
      );
      console.log("ORDER:", response.data);

      const order = response.data;

      const options = {
        key: "rzp_test_SeuwTZHoUlo6gg",
        amount: order.amount,
        currency: order.currency,
        name: "E-Kart",
        description: product.title,
        order_id: order.id,

        handler: function (response) {
          alert(
            "Payment Successful!\nPayment ID: " +
              response.razorpay_payment_id
          );
        },

        theme: {
          color: "#2563eb",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error(error);
      alert("Payment Failed");
    }
  };

  if (isLoading) return <h2>Loading...</h2>;

  if (!product) return <h2>Product Not Found</h2>;

  const imageUrl = product.image?.startsWith("http")
    ? product.image
    : `${import.meta.env.VITE_API_URL}${product.image}`;

  return (
    <S.PageWrapper>
      <S.ProductContainer>
        <S.ImageCard>
          <img src={imageUrl} alt={product.title} />
        </S.ImageCard>

        <S.DetailsCard>
          <S.Badge>✓ In Stock</S.Badge>

          <S.ProductTitle>
            {product.title}
          </S.ProductTitle>

          <S.Rating>
            ★★★★★
            <span>4.8 Rating • 10 Reviews</span>
          </S.Rating>

          <S.Price>
            ₹{product.price}
          </S.Price>

          <S.Description>
            {product.description}
          </S.Description>

          <S.Features>
            <div><Truck size={18} /> Free Delivery</div>
            <div><ShieldCheck size={18} /> Secure Payment</div>
            <div><RefreshCw size={18} /> Easy Returns</div>
            <div><Award size={18} /> Premium Quality</div>
          </S.Features>

          <S.ButtonGroup>
            <S.AddToCartButton
              onClick={handleAddToCart}
            >
              Add To Cart
            </S.AddToCartButton>
            
            <S.BuyNowButton
              onClick={handlePayment}
            >
              Buy Now
            </S.BuyNowButton>
          </S.ButtonGroup>
        </S.DetailsCard>
      </S.ProductContainer>
    </S.PageWrapper>
  );
}
