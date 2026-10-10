import { useState } from "react";
import { Alert, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import * as SecureStore from "expo-secure-store";

const tabs = ["الرادار", "الوكيل", "الإعدادات"] as const;
type Tab = (typeof tabs)[number];

export default function App() {
  const [tab, setTab] = useState<Tab>("الرادار");
  const [model, setModel] = useState("claude-opus-4.8");
  const [apiKey, setApiKey] = useState("");

  async function saveSettings() {
    await SecureStore.setItemAsync("qannas_ai_model", model.trim());
    if (apiKey.trim()) await SecureStore.setItemAsync("qannas_ai_api_key", apiKey.trim());
    Alert.alert("تم الحفظ", "تم حفظ إعدادات الوكيل محلياً في التخزين المشفّر.");
  }

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.brand}>قنّاص</Text>
        <Text style={styles.caption}>رادار سولانا ووكيل التحليل</Text>
      </View>
      <View style={styles.tabs}>
        {tabs.map((item) => (
          <Pressable key={item} onPress={() => setTab(item)} style={[styles.tab, tab === item && styles.tabActive]}>
            <Text style={[styles.tabText, tab === item && styles.tabTextActive]}>{item}</Text>
          </Pressable>
        ))}
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        {tab === "الرادار" && <Radar />}
        {tab === "الوكيل" && <Agent />}
        {tab === "الإعدادات" && <Settings model={model} setModel={setModel} apiKey={apiKey} setApiKey={setApiKey} onSave={saveSettings} />}
      </ScrollView>
    </SafeAreaView>
  );
}

function Radar() {
  return <View style={styles.card}><Text style={styles.title}>رادار العملات</Text><Text style={styles.body}>سيجلب هذا القسم العملات المطابقة لقاعدة القنّاص من مصدر بيانات Solana ويعرض الإشارات الجديدة.</Text><Text style={styles.muted}>المرحلة التالية: نقل منطق scanShelf وقواعد scoreCoin إلى التطبيق.</Text></View>;
}

function Agent() {
  return <View style={styles.card}><Text style={styles.title}>وكيل الذكاء الاصطناعي</Text><Text style={styles.body}>يحلل العملات التي يلتقطها الرادار فقط: الزخم والسيولة وحجم التداول والمخاطر.</Text><Pressable style={styles.button} onPress={() => Alert.alert("قريباً", "سيتم ربط الوكيل بالرادار وCodeCraft في المرحلة التالية.")}><Text style={styles.buttonText}>حلل العملات الملتقطة</Text></Pressable></View>;
}

function Settings({ model, setModel, apiKey, setApiKey, onSave }: { model: string; setModel: (value: string) => void; apiKey: string; setApiKey: (value: string) => void; onSave: () => void }) {
  return <View style={styles.card}><Text style={styles.title}>الإعدادات</Text><Text style={styles.label}>نموذج CodeCraft</Text><TextInput value={model} onChangeText={setModel} autoCapitalize="none" style={styles.input} placeholderTextColor="#64748b" /><Text style={styles.label}>مفتاح CodeCraft API</Text><TextInput value={apiKey} onChangeText={setApiKey} secureTextEntry autoCapitalize="none" style={styles.input} placeholder="cc_..." placeholderTextColor="#64748b" /><Pressable style={styles.button} onPress={onSave}><Text style={styles.buttonText}>حفظ محلي</Text></Pressable><View style={styles.divider} /><Text style={styles.label}>حساب X</Text><Text style={styles.body}>سيُضاف ربط OAuth الرسمي مع PKCE في المرحلة التالية. تدخل بياناتك في صفحة X الرسمية وتعود جلسة مشفّرة إلى التطبيق.</Text><Pressable style={styles.buttonSecondary} onPress={() => Alert.alert("ربط X", "سيتم فتح تفويض X الرسمي عند إضافة Client ID وRedirect URI.")}><Text style={styles.buttonText}>ربط حساب X</Text></Pressable></View>;
}

const styles = StyleSheet.create({ screen: { flex: 1, backgroundColor: "#020617" }, header: { padding: 22, backgroundColor: "#0f172a" }, brand: { color: "#f8fafc", fontSize: 28, fontWeight: "800", textAlign: "right" }, caption: { color: "#94a3b8", marginTop: 4, textAlign: "right" }, tabs: { flexDirection: "row-reverse", padding: 12, gap: 8 }, tab: { flex: 1, padding: 11, borderRadius: 10, backgroundColor: "#111827" }, tabActive: { backgroundColor: "#2563eb" }, tabText: { color: "#94a3b8", textAlign: "center", fontWeight: "700" }, tabTextActive: { color: "#fff" }, content: { padding: 16 }, card: { backgroundColor: "#0f172a", borderRadius: 16, borderWidth: 1, borderColor: "#1e293b", padding: 18, gap: 12 }, title: { color: "#f8fafc", fontSize: 21, fontWeight: "800", textAlign: "right" }, body: { color: "#cbd5e1", lineHeight: 22, textAlign: "right" }, muted: { color: "#64748b", lineHeight: 20, textAlign: "right" }, label: { color: "#e2e8f0", fontWeight: "700", textAlign: "right" }, input: { borderWidth: 1, borderColor: "#334155", color: "#f8fafc", backgroundColor: "#020617", borderRadius: 10, padding: 12, textAlign: "left" }, button: { backgroundColor: "#2563eb", padding: 13, borderRadius: 10 }, buttonSecondary: { backgroundColor: "#334155", padding: 13, borderRadius: 10 }, buttonText: { color: "#fff", fontWeight: "800", textAlign: "center" }, divider: { height: 1, backgroundColor: "#334155", marginVertical: 4 } });
