import * as Linking from 'expo-linking';
import { useStripe } from "@stripe/stripe-react-native";
import { useState } from "react";
import { ActivityIndicator, Alert, Text, TouchableOpacity, View } from "react-native";
import { useRouter } from 'expo-router';

async function fetchPaymentSheetParams(amount: number): Promise<{
    paymentIntent: string;
    ephemeralKey: string;
    customer: string;
}> {
    return fetch(`/api/payment-sheet`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ amount })
    }).then(res => res.json());
}


export default function CheckoutForm({
    amount,
    onSuccess,
}: {
    amount: number,
    onSuccess: () => void
}) {

    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const initializePaymentSheet = async () => {
        setLoading(true);
        const { customer, ephemeralKey, paymentIntent } = await fetchPaymentSheetParams(amount);

        const { error } = await initPaymentSheet({
            merchantDisplayName: "GrknDev LLC.",
            customerId: customer,
            customerEphemeralKeySecret: ephemeralKey,
            paymentIntentClientSecret: paymentIntent,
            allowsDelayedPaymentMethods: true,
            defaultBillingDetails: {
                name: "Grkn Dev",
                email: "info@grkn.dev",
                phone: "888-888-8888",
            },
            returnURL: Linking.createURL("stripe-redirect"),

            applePay: {
                merchantCountryCode: "US"
            }
        });
        if (!error) {

            openPaymentSheet();
        } else {
            console.log("initializePaymentSheet error: ", error
            );
        }
        setLoading(false);
    };

    const openPaymentSheet = async () => {
        const { error } = await presentPaymentSheet();

        if (error) {
            // console.log("openPaymentSheet error: ", error);
            if (error.code === "Canceled") {
                Alert.alert("Payment Canceled", "You have canceled the payment process.");
            }
        } else {
            onSuccess();
        }
        setLoading(false);
    }



    return <TouchableOpacity onPress={initializePaymentSheet} disabled={loading} className="disabled:opacity-75 bg-zinc-900 w-full p-6 mt-4 rounded-3xl items-center justify-center flex-row">
        <View className='flex-1 items-center justify-center fixed'>
            {
                loading ? (
                    <ActivityIndicator color="white" />
                ) : (
                    <View className="flex-row items-center justify-between w-full">
                        <Text className="text-white font-bold text-lg">Checkout</Text>
                        <Text className="text-white font-bold text-lg">${amount}</Text>
                    </View>
                )
            }
        </View>

    </TouchableOpacity>
}