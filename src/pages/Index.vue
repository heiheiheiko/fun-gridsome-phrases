<template>
  <Layout>
    <h1> Phrase Manager </h1>
    <v-row>
      <v-col cols="8">
        <section>
          <v-chip-group
            v-model="selectedTagPositions"
            column
            multiple
          >
            <v-chip
              filter
              outlined
              v-for="(edge, index) in $page.allTag.edges" :key="index"
            >
              {{edge.node.id}}
            </v-chip>
          </v-chip-group>
        </section>

        <section>
          <v-list flat>
            <v-list-item-group
              v-model="selectedPhrasePositions"
              multiple
            >
              <v-list-item v-for="(edge, index) in filteredPhraseEdges" :key="index">
                <template v-slot:default="{ active }">
                  <v-list-item-action>
                    <v-checkbox :input-value="active"></v-checkbox>
                  </v-list-item-action>

                  <v-list-item-content>
                    <v-list-item-title>{{ edge.node.text }}</v-list-item-title>
                    <v-list-item-subtitle>{{ edge.node.tags.map((t)=>t.id).join(' ') }}</v-list-item-subtitle>
                  </v-list-item-content>
                </template>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </section>
      </v-col>
      <v-col>
        <v-textarea
          id="textarea"
          outlined
          label="Your Phrases"
          :value="selectedPhrases"
        ></v-textarea>
        <v-btn @click="onCopy"> copy </v-btn>
      </v-col>
    </v-row>
  </Layout>
</template>

<script>

export default {
  metaInfo: {
    title: "Phrase-o-mate"
  },
  data () {
    return {
      selectedPhrasePositions: [],
      selectedTagPositions: [],
    }
  },
  computed: {
    selectedTags(){
      if (!this.$page.allTag) return [];

      return this.selectedTagPositions.map((position) => {
        const tags = this.$page.allTag.edges.map((e) => e.node.id);
        return tags[position];
      }); 
    },
    selectedPhrases() {
      if (!this.$page.allPhrase) return [];

      return this.selectedPhrasePositions.map((position) => {
        const phrases = this.$page.allPhrase.edges.map((e) => e.node.text);
        return phrases[position];
      }).join('; '); 
    },
    filteredPhraseEdges() {
      if (!this.$page.allPhrase || !this.$page.allTag) return [];
      if (!this.selectedTags.length) { return this.$page.allPhrase.edges}

      return this.$page.allPhrase.edges.filter((e) => {
        const phraseTags = e.node.tags.map((t)=>t.id);
        const includes = (item) => phraseTags.includes(item);
        return this.selectedTags.some(includes);
      });
    },
  },
  methods: {
    onCopy() {
      var copyText = document.getElementById("textarea");
      copyText.select();
      copyText.setSelectionRange(0, 99999)
      document.execCommand("copy");
    }
  }
};
</script>

<page-query>
query {
  allPhrase {
    totalCount
    edges {
      node {
        id
        text
        tags {
          id
        }
      }
    }
  },
  allTag {
    edges {
      node {
        id
      }
    }
  }
}
</page-query>