<template>
  <div class="p-component">
		<div class="div-container" style="margin-top:2rem;">
      <!-- <h3>Поиск</h3> -->
  <AutoComplete v-model="token" :suggestions="searchVariants" placeholder="Впишите слово" @complete="search($event)" @item-select="getSelection($event)" field="name" />
	</div>
</div>

</template>

<script>

export default {
	data() {
		return {
			searchVariants: null,
			token: null
		}
	},
	// countryService: null,
	created() {
		// this.countryService = new CountryService();
	},
	methods: {
		getSelection(e) {
			console.log(e.value.id);
		},
		search(e) {
				console.log("query", e.query);
				const result = [{"name": "hello", "id": 12},  {"name": "computer", "id": 32}];
				this.searchVariants = result;
		},
	}
}
</script>

<style>

.div-container {
  text-align: center;
}

.p-autocomplete-item{
	text-align: left;
	color: red;
}
</style>
