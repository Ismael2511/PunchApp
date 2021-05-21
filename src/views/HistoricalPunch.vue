<template>
    <div>
        <div class="border rounded m-3 p-3">
            <div class="border-bottom">
                <p class="fw-bolder">Employee: <span class="fw-normal">{{name}}</span></p>
            </div>
            <div class="border-bottom mt-3">
                <p class="fw-bolder">Date: <span class="fw-normal">{{date}}</span></p>
            </div>
            <div class="border-bottom mt-3">
                <p class="fw-bolder">Type: <span class="fw-normal">{{typePunch}}</span></p>
            </div>
            <div class="mt-3">
                <p class="fw-bolder">Time: <span class="fw-normal">{{timePunch}}</span></p>
            </div>
        </div>
    </div>
</template>

<script>
import { eventBus } from '@/App'

export default {
    props:['typePunch','timePunch'],
    data: () => {
        return {
            name:"",
            date: "",
        }
    },
    created(){
        this.name = eventBus.$data.name
        this.date = eventBus.$data.datePunch
    }
}
</script>