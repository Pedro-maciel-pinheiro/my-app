import { useState } from "react";

import { ProductCartProps, useCartStore } from "@/stores/cart-store";
import { View, Text, ScrollView, Alert, Linking } from "react-native";


import { Header } from "@/components/header";
import { Product } from "@/components/product";
import { Input } from "@/components/input";
import { Button } from "@/components/button";

import { formatCurrency } from "@/utils/functions/format-currency";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Feather } from "@expo/vector-icons";
import { LinkButton } from "@/components/link-button";
import { useNavigation } from "expo-router";


const PHONE_NUMBER = "5561998516239"


export default function Cart() {

    const [address, setAddress] = useState("")

    const cartStore = useCartStore()

    const navigation = useNavigation()

    const total = formatCurrency(cartStore.products.reduce((total, product) => total + product.price * product.quantity, 0))


    function handleProductRemove(product: ProductCartProps) {
        Alert.alert("Remover", `Deseja remover ${product.title}`, [

            { text: "Cancelar" },


            {
                text: "Remover",
                onPress: () => cartStore.remove(product.id)
            }
        ])

    }

    function handleOrder() {
        if (address.trim().length === 0) {
            return Alert.alert("Pedido", "Informe os dados da entrega.")
        }

        const products = cartStore.products.map((product) =>
            `\n ${product.quantity} ${product.title}`).join("")


        const message = `
        🍽  NOVO PEDIDO
          \n Entregar em: ${address}
          

          ${products}
          
          \n Valor total:${total}

        `
        Linking.openURL(`http://api.whatsapp.com/send?phone=${PHONE_NUMBER}&text=${message}`)
            

        cartStore.clear()
        navigation.goBack()
    }




    return (
        <View className="flex-1 pt-8 text-white text-2xl">

            <Header title="Seu carrinho" cartQuantityItems={0} />
            <KeyboardAwareScrollView>
                <ScrollView>
                    {cartStore.products.length > 0 ? (
                        <View className="flex-1 p-6 border-b border-slate-700" >
                            {
                                cartStore.products.map((product) => (
                                    <Product data={product}
                                        onPress={() => handleProductRemove(product)} />))}

                        </View>
                    ) : (
                        <Text className="font-body text-slate-400 text-center my-8">
                            Seu carrinho está vazio
                        </Text>)}
                    <View className="mx-5">
                        <View className="flex-row gap-2 items-center mt-5 mb-4">

                            <Text className="text-white text-xl font-subtittle">Total:</Text>
                            <Text className="text-lime-400 text-2xl font-heading ">{total}</Text>

                        </View>

                        <Input placeholder="Informe o endereço de entrega com Rua , Bairro , CEP , número e complementos ..."

                            onChangeText={setAddress}
                            blurOnSubmit={true}
                            onSubmitEditing={handleOrder}
                            returnKeyType="next"

                        />
                    </View>
                </ScrollView>
            </KeyboardAwareScrollView>

            <View className="p-5 gap-5">
                <Button onPress={handleOrder}>
                    <Button.Text>Enviar pedido</Button.Text>
                    <Button.Icon>
                        <Feather name="arrow-right-circle" size={20} />
                    </Button.Icon>
                </Button>

                <LinkButton title="Voltar ao Menu" href="/" />
            </View>
        </View>
    )
}