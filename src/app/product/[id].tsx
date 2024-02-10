import { View, Image, Text } from "react-native";
import { useLocalSearchParams } from "expo-router"
import { PRODUCTS } from "@/utils/data/products";
import { formatCurrency } from "@/utils/functions/format-currency";
import { Button } from "@/components/button";


export default function Product() {
    const { id } = useLocalSearchParams()



    const product = PRODUCTS.filter((item) => item.id === id[0])[0]




    return (
        <View className="flex-1">
            <Image source={product.cover} className="w-full h-52" resizeMode="cover" />

            <View className="flex-1 p-5 mt-8">
                <Text className="text-lime-400 text-2xl font-heading my-2">
                    {formatCurrency(product.price)}
                </Text>

                <Text className="text-slate-300 font-body text-base leading-6 mb-6">
                    {product.description}
                </Text>

                {product.ingredients.map((ingredient) =>(
                    <Text key={ingredient} 
                    className="text-slate-300 text-base leading-6">
                        {"\u2022"} {ingredient}
                
                    </Text>
                )) }

                <View>
                    
                    
                    
                </View>


            </View>
        </View>



    )
}