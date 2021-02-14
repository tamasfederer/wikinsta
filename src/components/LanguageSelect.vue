<template>
	<div class="overlay" @click="emitChangeLanguage(null)">
		<FlagNl class="flag" @click="emitChangeLanguage('nl')" />
		<FlagEn class="flag" @click="emitChangeLanguage('en')" />
		<FlagFr class="flag" @click="emitChangeLanguage('fr')" />
		<FlagDe class="flag" @click="emitChangeLanguage('de')" />
		<FlagHu class="flag" @click="emitChangeLanguage('hu')" />
		<FlagIt class="flag" @click="emitChangeLanguage('it')" />
		<FlagEs class="flag" @click="emitChangeLanguage('es')" />
		<FlagSv class="flag" @click="emitChangeLanguage('sv')" />
	</div>
</template>
<script>
import FlagHu from '@/components/Flag/FlagHu';
import FlagEn from '@/components/Flag/FlagEn';
import FlagDe from '@/components/Flag/FlagDe';
import FlagFr from '@/components/Flag/FlagFr';
import FlagSv from '@/components/Flag/FlagSv';
import FlagNl from '@/components/Flag/FlagNl';
import FlagEs from '@/components/Flag/FlagEs';
import FlagIt from '@/components/Flag/FlagIt';

export default {
	name: 'LanguageSelect',
	components: {
		FlagHu,
		FlagEn,
		FlagDe,
		FlagFr,
		FlagSv,
		FlagEs,
		FlagIt,
		FlagNl,
	},
	emits: [
		'changeLanguage',
	],
	methods: {
		emitChangeLanguage(language) {
			this.$emit('changeLanguage', language);
		}
	},
}
</script>
<style lang="css" scoped>
.overlay {
	position: fixed;

	top: 0;
	left: 0;

	width: 100%;
	height: 100%;

	z-index: 1000;

	display: flex;
	flex-flow: row wrap;
	justify-content: center;
	align-content: center;

	background: var(--color-language-select-bg);
}

.flag {
	height: 48px;
	border-radius: 24px;
	padding: 16px;
}

@media (hover: hover) {
	.flag {
		filter: grayscale(0.75);
	}

	.flag:hover {
		filter: grayscale(0);
		transition: 0.2s;
		cursor: pointer;
	}
}
</style>