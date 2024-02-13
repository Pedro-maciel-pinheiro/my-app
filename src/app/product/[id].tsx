import { View, Image, Text } from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router"
import { Redirect } from "expo-router";
import { PRODUCTS } from "@/utils/data/products";
import { formatCurrency } from "@/utils/functions/format-currency";
import { Button } from "@/components/button";
import { Feather } from "@expo/vector-icons";
import { LinkButton } from "@/components/link-button";
import { useCartStore } from "@/stores/cart-store";




export default function Product() {
    const { id } = useLocalSearchParams()
    const cartStore = useCartStore()
    const navigation = useNavigation()

    const product = PRODUCTS.find((item) => item.id === id[0])

    function handleAddToCart(){
        if(product){
            cartStore.add(product)
            navigation.goBack()
        }
        
    }
    

    if(!product){
        return <Redirect href="/"/>
    }

    return (
        <View className="flex-1">
            <Image source={product.cover} className="w-full h-52" resizeMode="cover" />

              

            <View className="flex-1 p-5 mt-8">
                <Text className="text-white text-2xl font-heading">{product.title}</Text>
                <Text className="text-lime-400 text-2xl font-heading my-2">
                    {formatCurrency(product.price)}
                </Text>

                <Text className="text-slate-300 font-body text-base leading-6 mb-6">
                    {product.description}
                </Text>

                {product.ingredients.map((ingredient) => (
                    <Text key={ingredient}
                        className="text-slate-300 text-base leading-6">
                        {"\u2022"} {ingredient}

                    </Text>
                ))}

                 <View className="p-5 pb-8 gap-7">

                     <Button onPress={handleAddToCart}>
                         <Button.Icon>
                            <Feather name="plus-circle" size={22} />
                         </Button.Icon>
                         <Button.Text>
                            Adicionar ao pedido
                         </Button.Text>
                     </Button>
                     <LinkButton  title="Voltar ao Menu" href="/">Teste</LinkButton>
                        
                       
                  
                 </View>

            </View>
        </View>



    )
}