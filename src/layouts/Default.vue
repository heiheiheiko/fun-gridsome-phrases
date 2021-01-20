<template>
  <v-app>
    <v-app-bar app>
      <v-container class="py-0 fill-height">
        <v-toolbar-title>Phrase-o-mate</v-toolbar-title>
      </v-container>
    </v-app-bar>

    <v-main>
      <v-container>
        <slot></slot>
      </v-container>
    </v-main>
  </v-app>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>