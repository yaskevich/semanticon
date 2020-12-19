<template>
  <div class="p-component">
		<div class="div-container" style="margin-top:2rem;">
      <!-- <h3>Поиск</h3> -->
			<!-- <pre>{{tokens}}</pre> -->
  <AutoComplete v-model="token"
		:suggestions="searchVariants"
		placeholder="Впишите слово"
		field="name"
		scrollHeight="200"
		:minLength="Number(2)"
		@complete="search($event)"
		@item-select="getSelection($event)">
			<template #item="slotProps">
				<div>
						<span v-for="(v, i) in slotProps.item.arr" :key="i">
							<span v-if="v===token" class="match">{{v}}</span>
							<span v-else>
								{{v}}
							</span>
						</span>
				</div>
		</template>
	</AutoComplete>
	</div>
</div>

</template>

<script>
import store from "@/modules/store";
// eslint-disable-next-line no-unused-vars
import { unref, ref, computed } from "vue";
export default {
	name: "Search",
	props: {
		item: Object
	},
	setup(){
		const datum = store.state.config;
		let searchVariants = ref(null);
		let token =  ref(null);
		const show = (d) => {
			console.log(d, "dfdfs");
			return "kek";
		};
		const getSelection = (e) => {
			console.log(e.value.id);
		};
		const search = (e) => {
				console.log("query", e.query);
				const str = e.query;
				const re = new RegExp(`(?=${str})|(?<=${str})`, 'gi');
				const result = datum.tokens.values
					.filter(x => x.includes(str));

					// console.log(result.map(x => this.datum.tokens.values.indexOf(x)));
					// for(let i=0; i<this.length; i++){
					//
					// }
					// searchVariants.value = result.map(x=> ({"name": x.replace(e.query, '<span v-html="x">'+e.query+'</span>'), "id": datum.tokens.values.indexOf(x)}));
				searchVariants.value = result.map(x=> ({"name": x, "id": datum.tokens.values.indexOf(x), "arr": x.split(re)}) );
		};

		return {getSelection, search, show, datum, searchVariants, token};
	},
}
</script>

<style>

.match{
	font-weight: bold;
}
.div-container {
  text-align: center;
}

.p-autocomplete-item{
	text-align: left;
	color: red;
}
</style>
