import { useParams } from "react-router-dom";
import Container from "../../components/ui/Container";

function ProductPage()
{
    const {id} = useParams<{id: string}>()

    return(
    <Container>
        <h1>Product Details</h1>
        <p>Product Id: {id}</p>
    </Container>        
    )


}

export default ProductPage