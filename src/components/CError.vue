<template>
    <div class="alert alert-danger"><li v-for="(el,i) in error" :key="i">{{el}}</li></div>
</template>

<script>
export default {
    props:{
        error: {
            type: Array
        },
    }
}
</script>