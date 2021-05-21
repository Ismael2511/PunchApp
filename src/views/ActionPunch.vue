<template>
    <div>
        <div class="col-md-6 border mx-auto p-4 rounded">
            <h1>Break / Lunch / Exit Punches</h1>
            <p>Hi <span class="fw-bolder text-primary">{{employeeName}}</span>, what are you doing now?
            <br>
            <sub>Entry Time: {{entryTime}}</sub>
            </p>
            <div class="alert alert-dark">You have {{breaks}} breaks availables and {{lunch}} lunch available.</div>

            <div class="row text-center">
                <div class="col-md-4">
                    <button 
                        v-if="!breakOn"
                        :disabled="disableBreak"
                        class="btn btn-primary"
                        @click="goToBreak"
                    >Go to Break</button>
                    <button 
                        v-if="breakOn"
                        class="btn btn-warning"
                        @click="returnFromBreak"
                    >Return from Break</button>
                </div>
                <div class="col-md-4">
                    <button 
                        v-if="!LunchOn"
                        :disabled="disableLunch"
                        class="btn btn-success"
                        @click="goToLunch"
                    >Go to Lunch</button>
                    <button 
                        v-if="LunchOn"
                        class="btn btn-warning"
                        @click="returnFromLunch"
                    >Return from Lunch</button>
                </div>
                <div class="col-md-4">
                    <button 
                        class="btn btn-danger"
                        :disabled="disableExit"
                        @click="exitApp"
                    >Exit</button>
                </div>
            </div>            
            <hr>
            <button 
                @click="showHistoric = !showHistoric"
                class="btn btn-secondary"
            >See My History</button>
            <c-historical
                :typePunch="type"
                :timePunch="time"
                v-if="showHistoric"
            />
        </div>

    </div>
</template>

<script>
import Historical from './HistoricalPunch'
import { eventBus } from '@/App'
import Swal from 'sweetalert2'
import { Maintenance } from './../services/Maintenance'

export default {
    components: {
        'c-historical': Historical
    },
    data: () => {
        return {
            employeeName: "",
            breaks:2,
            lunch: 1,
            type:"",
            time: "",
            entryTime: "",
            breakOn:false,
            LunchOn: false,
            disableBreak:false,
            disableLunch:false,
            disableExit:false,
            showHistoric: false
        }
    },
    created(){
        this.splitName(eventBus.$data.name)
        this.entryTime = eventBus.$data.entryTime
    },
    destroyed(){
        eventBus.$data.name = ""
        eventBus.$data.datePunch = ""
        eventBus.$data.type = ""
    },
    watch: {
        breaks(){ if(this.breaks == 0) this.disableBreak = true;},
        lunch(){ if(this.lunch === 0) this.disableLunch = true }
    },
    methods: {
        splitName(name) { this.employeeName = name.split(' ')[0] },

        goToBreak(){    
            this.type = "Break"  
            this.time = Maintenance.setTime() 
            this.disableLunch = this.disableExit = this.breakOn = true
            this.breaks--
        },
        returnFromBreak(){ 
            this.lunch === 0 ? this.disableBreak = this.breakOn = this.disableExit = false : 
            this.disableLunch = this.disableExit = this.breakOn = false
            if(this.breaks === 0 ) this.disableBreak = true
        },
        
        goToLunch(){    
            this.type = "Lunch" 
            this.disableBreak = this.disableExit = this.LunchOn = true
            this.lunch--
        },
        returnFromLunch(){ 
            this.breaks === 0 ? this.LunchOn = this.disableExit = false 
            : 
            this.disableBreak  = this.disableExit = this.LunchOn = false 
        },
        exitApp(){
            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                    confirmButton: 'btn btn-success',
                    cancelButton: 'btn btn-danger'
                },
                buttonsStyling: true
                })

                swalWithBootstrapButtons.fire({
                title: 'Leaving so early?',
                text: `I've my eye on you ${this.employeeName}`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, I\'m leaving',
                cancelButtonText: 'No, I\'m staying!',
                reverseButtons: true
                }).then((result) => {
                if (result.isConfirmed) {
                    this.$emit('changeComponent', 'c-index')
                } else if (
                    result.dismiss === Swal.DismissReason.cancel
                ) {
                    swalWithBootstrapButtons.fire(
                    'Well Done',
                    'I always knew you were one of the best',
                    'success'
                    )
                }
            })
        }
    }
    
}
</script>