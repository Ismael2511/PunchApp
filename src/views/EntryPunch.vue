<template>
    <div>
        <div class="col-lg-6 border mx-auto p-4 rounded">
        <h1>Entry Punch</h1>
        <p>Enter your Credentials Please</p>

        <form class="text-center d-flex align-items-center flex-column mx-5">
            <div class="col-sm-12 col-12 mt-2">
                <c-error
                    v-if="errorArr.length > 0"
                    :error="errorArr"
                ></c-error>
                <div class="form-group">
                    <label for="name">Employee Name:</label>
                    <input 
                        type="text" 
                        v-model.trim.lazy="name" 
                        class="form-control" 
                        id="name"
                    >
                </div>
            </div>
            <div class="col-sm-12 col-12 mt-2">
                 <div class="form-group">
                    <label for="entryDate">Date:</label>
                    <input 
                        type="date" 
                        v-model.trim.lazy="date" 
                        class="form-control" 
                        id="entryDate"
                    />
                </div>
            </div>
            <br>

            <span class="spinner-border text-primary mb-2" v-if="loading" />
            <button 
                type="submit" 
                :disabled="disabled" 
                class="btn btn-primary"
                @click.prevent="submitData"
            >Submit</button>
        </form>
        </div>
    </div>
</template>

<script>
import { Mixins } from '@/mixins/mixins'
import { eventBus } from '@/App'
import CError from '@/components/CError'
import { Maintenance } from './../services/Maintenance'

export default {
    mixins: [Mixins],
    components: {
        'c-error': CError
    },
    data: () => {
        return {
            name: "",
            date:"",
            errorArr: []
        }
    },
    methods:{
        validateForm(){
            this.errorArr = []
            if(!this.name) this.errorArr.push('Fill field Employee Name Please!')
            if(!this.date) this.errorArr.push('Fill field Date Please!')
        },
        submitData(){

            this.validateForm()

            if(this.errorArr.length > 0) return; 

            eventBus.$data.name = this.name
            eventBus.$data.datePunch = this.date
            eventBus.$data.entryTime = Maintenance.setTime() 
            eventBus.$data.type = 'Entrance' 

            this.ToggleSubmitOpt()

            setTimeout(() => {
                this.ToggleSubmitOpt()
                this.$emit('changeComponent', 'action-punch')
            }, 3000)
        }
    }
}
</script>