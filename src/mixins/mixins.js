export const Mixins = {
    data: () => {
        return{
            disabled: false,
            loading: false
        }
    },
    methods: {
        ToggleSubmitOpt(){
            this.disabled = this.loading = !this.disabled
        },
    }
}