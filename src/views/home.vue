<template>
	<div class="m-4 w-11/12 bg-slate-200 rounded-lg p-10">
		<div class="mb-4">
			<div class="bg-slate-200">
				<label class="font-bold mb-2" for="">Search:</label>
				<input v-model="keyword" class="p-2 lg:mx-4 mb-1 rounded-lg w-full lg:w-36" placeholder="Ej: Cristiano Ronaldo" type="text" />
				<select v-model="order" class="p-2 lg:mr-4 mb-1 rounded-lg w-full lg:w-36" name="" id="">
					<option value="asc" selected>Asc</option>
					<option value="desc">Desc</option>
				</select>
				<select v-model="typeSearch" class="p-2 lg:mr-4 mb-1 rounded-lg w-full lg:w-36" name="" id="">
					<option value="name" selected>By Name</option>
					<option value="team">By Team</option>
				</select>
				<button @click="searchPlayers" class="bg-slate-600 rounded-lg py-2 px-4 w-full lg:w-32 text-white font-semibold">Submit</button>
			</div>
		</div>
		<div class="lg:grid grid-cols-4 gap-4">
			<div v-for="player in players" :key="player._id">
				<CardPlayers :player="player"></CardPlayers>
			</div>
		</div>
		<footer>
			<VueTailwindPagination
				class="w-36 lg:w-full mt-3"
				:current="currentPage"
				:total="total"
				:per-page="perPage"
				@page-changed="change($event)"
			/>
		</footer>
	</div>
</template>

<script>
	import CardPlayers from "../components/Home/CardPlayers.vue";
	import VueTailwindPagination from "@ocrv/vue-tailwind-pagination";

	export default {
		components: { CardPlayers, VueTailwindPagination },
		data() {
			return {
				players: [],
				currentPage: 1,
				perPage: 1,
				total: 0,
				keyword: "",
				order: "asc",
				typeSearch: "name",
			};
		},
		created() {
			this.getPlayers();
		},
		methods: {
			async getPlayers(keyword = "", page = 1, order = "asc") {
				fetch(`http://localhost:3000/api/v1/players?keyword=${keyword}&page=${page}&order=${order}`)
					.then((res) => res.json())
					.then((res) => {
						console.log("Res", res);
						(this.currentPage = res.Page), (this.perPage = 2), (this.total = res.TotalPages);
						this.players = res.Players;
					});
			},
			async getPlayersByTeam() {
				fetch(`http://localhost:3000/api/v1/players`, 
               { 
                  method: "post",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ 
                     keyword: this.keyword, 
                     page: this.currentPage, 
                     order: this.order 
                  })
               })
					.then((res) => res.json())
					.then((res) => {
						console.log("Res", res);
						(this.currentPage = res.Page), (this.perPage = 2), (this.total = res.TotalPages);
						this.players = res.Players;
					});
			},
			searchPlayers() {
				console.log("search", this.keyword);
				if (this.typeSearch === "name") {
					this.getPlayers(this.keyword, this.currentPage, this.order);
				} else {
               console.log("by team");
               this.getPlayersByTeam();
				}
			},
			change(evt) {
				this.currentPage = evt;
				console.log("Total", this.total);
				this.getPlayers(this.keyword, evt);
				console.log("change", evt);
			},
		},
	};
</script>

<style></style>
