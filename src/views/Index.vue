<template>
    <div class="row ">
        <div class="col-sm-6 mx-auto">
          <div class="card p-2">
            <div class="card-body">
                <h4 class="card-title display-5">Welcome To <strong>Punch App</strong></h4>
                <p class="card-text">Hi Employee, better hurry before you'd be late.</p>
                
                <button 
                    @click=" $emit('changeComponent', 'entry-punch') " 
                    class="btn btn-primary"
                >Punch Now</button>
            </div>
          </div>
        </div>
      </div>
</template>

<script>
export default {
    
    methods: {
        
    }
}
</script>