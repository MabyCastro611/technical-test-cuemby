<template>
	<div class="h-screen mx-4 mt-4">
			<div class="bg-slate-800 lg:w-full h-auto p-4 rounded-xl cursor-pointer hover:bg-slate-900">
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
	</div>
</template>

<script>
	export default {
      data(){
         return {
            player: {}
         }
      },
		computed: {
			Id() {
				return this.$route.params.id;
			},
		},
		created() {
			console.log("ID", this.$route.params.id);
         this.getDataPlayer();
		},
		methods: {
			getDataPlayer() {
				fetch(`http://localhost:3000/api/v1/player`, {
					method: "post",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						id: this.Id,
					}),
				})
					.then((res) => res.json())
					.then((res) => {
						console.log("Res", res);
						this.player = res.player;
					});
			},
		},
	};
</script>

<style></style>
