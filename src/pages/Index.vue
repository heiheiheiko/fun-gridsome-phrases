<template>
  <Layout>
    <div>
      <div v-for="(edge, index) in $page.allPhrase.edges" :key="index">
        <h1> {{edge.node.text}} </h1>
      </div>

      <div v-for="(edge, index) in $page.allTag.edges" :key="index">
        <h1> {{edge.node.id}} </h1>
      </div>
    </div>
  </Layout>
</template>
<script>
export default {
  metaInfo: {
    title: "Gridsome How to Blog"
  }
};
</script>

<style>
.home-links a {
  margin-right: 1rem;
}
</style>

<page-query>
query {
  allPhrase {
    totalCount
    edges {
      node {
        id
        text
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