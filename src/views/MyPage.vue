<template>
    <div class="mypage">
        <AppBar/>

        <v-content>

            <v-tabs
                v-model="tab"
                centered
                grow
            >
                <v-tab
                    v-for="(t, index) in tabs"
                    :key="index"
                >
                    {{ t.name }}
                </v-tab>
            </v-tabs>
    
            <v-tabs-items
                v-model="tab"
                mandatory
            >
                <v-tab-item
                    v-for="(t, index) in tabs"
                    :key="index"
                >
                    {{ t.content }}
                </v-tab-item>
            </v-tabs-items>

        </v-content>
    </div>
</template>

<script>
import AppBar from "@/components/AppBar"

export default {
    name: "MyPage",

    data: () => ({
        tab: null,
        tabs: [
            { name: "About You", content: "About You" },
            { name: "Follows",   content: "Followed Streamers" },
            { name: "Favorits",  content: "Favorit Categories" },
        ]
    }),

    components: {
        AppBar
    }
}
</script>

<style scoped>
</style>