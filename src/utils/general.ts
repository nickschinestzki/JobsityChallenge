import { Platform } from "react-native";

export function convertRTFtoPlainText(original: string) {
   if (!original) return ""
   return original.replace(/(<([^>]+)>)/gi, "");
}
export const isAndroid = Platform.OS === "android"
