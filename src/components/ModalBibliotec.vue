<template>
  <b-modal
    :id="modalId"
    ref="modal"
    :title="titleModal"
    hide-footer
    @show="showModal"
  >
    <b-form class="px-2" @submit.prevent="sendForm">
      <b-row>
        <b-col cols="12">
          <b-form-group>
            <b-form-input
              v-model="bibliotec.name"
              type="text"
              required
              placeholder="Nombre"
              :disabled="isLoading"
            />
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group>
            <b-form-textarea
              v-model="bibliotec.company.catchPhrase"
              required
              placeholder="Párrafo"
              :disabled="isLoading"
            />
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group>
            <b-form-input
              v-model="bibliotec.username"
              type="text"
              required
              placeholder="Texto del Botón"
              :disabled="isLoading"
            />
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group>
            <b-form-input
              v-model="bibliotec.website"
              type="text"
              required
              placeholder="Enlace del Sitio Web"
              :disabled="isLoading"
            />
          </b-form-group>
        </b-col>
        <b-col cols="12" class="mt-2">
          <b-button
            type="submit"
            block
            variant="primary"
            :disabled="isLoading"
          >
            <b-spinner v-if="isLoading" small class="mr-2" label="Loading..."></b-spinner>
            <span>{{ textButtonSubmit }}</span>
          </b-button>
        </b-col>
      </b-row>
    </b-form>
  </b-modal>
</template>

<script>
import { stateInitialBibliotec, postBibliotec, putBibliotec } from '@/services/bibliotec'
export default {
  name: 'ModalBibliotec',
  props: {
    modalId: {
      type: String,
      required: true,
      default: 'modal-bibliotec',
    },
    bibliotecActive: {
      type: Object,
      required: true,
      default: () => ({ ...stateInitialBibliotec })
    },
  },
  data() {
    return {
      bibliotec: { ...stateInitialBibliotec },
      isLoading: false,
    }
  },
  computed: {
    titleModal() {
      return !this.bibliotec.id ? 'Nueva Cartilla' : 'Editar Cartilla'
    },
    textButtonSubmit() {
      return !this.bibliotec.id ? 'Registrar Cartilla' : 'Guardar Cartilla'
    },
  },
  methods: {
    clearBibliotec() {
      this.bibliotec = { ...stateInitialBibliotec }
    },
    showModal() {
      this.clearBibliotec()
      if (this.bibliotecActive.id) {
        this.bibliotec.id = this.bibliotecActive.id
        this.bibliotec.name = this.bibliotecActive.name
        // this.bibliotec.photo = this.bibliotecActive.photo
        this.bibliotec.company.catchPhrase = this.bibliotecActive.company.catchPhrase
        this.bibliotec.username = this.bibliotecActive.username
        this.bibliotec.website = this.bibliotecActive.website
        // No utilizo la desestructuracion porque el valor se asigna por referencia en los objetos hijos
        // this.bibliotec = { ...this.bibliotecActive }
      }
    },
    async sendForm() {
      let response = {}
      this.isLoading = true
      if (!this.bibliotec.id) {
        response = await postBibliotec({ ...this.bibliotec })
      } else {
        response = await putBibliotec(this.bibliotec.id, { ...this.bibliotec })
      }
      this.isLoading = false
      const { success, data } = response
      if (success) {
        this.$swal({
          title: 'Exito!',
          text: this.bibliotec.id ? 'Se registro la cartilla con éxito' : 'Se guardo la cartilla con éxito',
          icon: 'success',
          customClass: {
            confirmButton: 'btn btn-primary',
          },
          buttonsStyling: false,
        });
        this.$emit('send-bibliotec', { ...data })
        this.$bvModal.hide(this.modalId)
      } else {
        this.$swal({
          title: 'Error!',
          text: 'Ocurrio un error al enviar el formulario',
          icon: 'error',
          customClass: {
            confirmButton: 'btn btn-primary',
          },
          buttonsStyling: false,
        });
      }
    },
  },
}
</script>
