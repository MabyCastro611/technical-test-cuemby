<template>
	<div @click="viewDetail" class="bg-slate-800 lg:w-full h-auto p-4 rounded-xl cursor-pointer hover:bg-slate-900">
		<div class="mb-2">
			<img
				class="border-yellow-600 border rounded-xl"
				src="https://img.a.transfermarkt.technology/portrait/big/8198-1631656078.jpg?lm=1"
				alt=""
			/>
		</div>
		<p class="text-center text-yellow-500 font-semibold">{{ player.name }}</p>
		<div class="p-2">
			<div class="text-white">
				<li>Nacio: {{ player?.nationality }}</li>
				<li>Position: {{ player?.position }}</li>
				<li>Club: {{ player?.team }}</li>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			player: { required: false },
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
				fetch(`http://localhost:3000/api/v1/players`, {
					method: "post",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						keyword: this.keyword,
						page: this.currentPage,
						order: this.order,
					}),
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
         viewDetail(){
            this.$router.push({ path: `/detail/${this.player._id}`});
         }
		},
	};
</script>

<style></style>
