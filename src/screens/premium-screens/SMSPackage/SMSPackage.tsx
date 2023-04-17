import KeyboardAwareView from "@ui/KeyboardAwareView/KeyboardAwareView";
import { Button, HStack, Image, Text, VStack } from "native-base";
import React, { useState } from "react";
import PremiumPackageCard from "@ui/PremiumPackageCard/PremiumPackageCard";
import { useNavigation } from "@react-navigation/native";
import { messageRoutes } from "@routes/index";
import { fontSizes } from "@typography";
import { Premium } from "@assets/svg/icons";

export default function SMSPackage() {
  const navigation = useNavigation();
  const [price, setPrice] = useState<string>("Pay 150 BDT");
  const [packageDuration, setPackageDuration] = useState({
    month1: false,
    month3: true,
    year1: false,
  });

  const handlePackageDuration = (type: string) => {
    switch (type) {
      case "month1":
        setPackageDuration({
          month1: true,
          month3: false,
          year1: false,
        });
        setPrice("Pay 100 BDT");
        break;
      case "month3":
        setPackageDuration({
          month1: false,
          month3: true,
          year1: false,
        });
        setPrice("Pay 150 BDT");
        break;
      case "year1":
        setPackageDuration({
          month1: false,
          month3: false,
          year1: true,
        });
        setPrice("Pay 200 BDT");
        break;
    }
  };

  return (
    <KeyboardAwareView>
      <Text color="primary.100" fontWeight={600} fontSize={fontSizes["2xl"]}>
        Buy SMS
      </Text>
      <VStack flex={1}>
        <HStack alignItems="center" mb="2">
          <Premium style={{ height: 30, width: 30 }} />
          <Text fontSize={fontSizes.sm} ml="10px" color="dark.200">
            Send Message to anyone
          </Text>
        </HStack>
        <HStack alignItems="center" mb="2">
          <Premium style={{ height: 30, width: 30 }} />
          <Text fontSize={fontSizes.sm} ml="10px" color="dark.200">
            See Who Message You
          </Text>
        </HStack>
        <HStack justifyContent={"space-between"} mt={"50px"} mb={"22px"}>
          <PremiumPackageCard
            price="100 BDT"
            duration="500 SMS"
            isSelected={packageDuration.month1}
            onPress={() => handlePackageDuration("month1")}
            w={"48%"}
          />
          <PremiumPackageCard
            price="150 BDT"
            duration="800 SMS"
            isSelected={packageDuration.month3}
            onPress={() => handlePackageDuration("month3")}
            w={"48%"}
          />
        </HStack>
        <PremiumPackageCard
          price="200 BDT"
          duration="1200 SMS"
          isSelected={packageDuration.year1}
          onPress={() => handlePackageDuration("year1")}
        />
      </VStack>
      <Button
        variant={"primary"}
        onPress={() =>
          navigation.navigate(
            "PaymentMethodScreen" as never,
            {
              price: price,
              packageDuration: packageDuration.month1
                ? 500
                : packageDuration.month3
                ? 800
                : 1200,
              type: "sms",
            } as never
          )
        }
      >
        Next
      </Button>
    </KeyboardAwareView>
  );
}
