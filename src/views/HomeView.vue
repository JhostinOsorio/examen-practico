<template>
  <b-row class="my-5">
    <modal-bibliotec
      :modal-id="modalId"
      :bibliotec-active="bibliotecActive"
      @send-bibliotec="sendBibliotec"
    />
    <b-col cols="12">
      <div class="d-flex align-center justify-content-between">
        <h2>Biblioteca</h2>
        <b-button size="sm" variant="link" class="outline-none" @click="newBibliotec">Agregar Cartilla</b-button>
      </div>
    </b-col>
    <b-col cols="12">
      <h4 v-if="isLoading" class="my-5">Cargando ...</h4>
      <div v-else class="list-grid mt-5">
        <b-card
          v-for="bibliotec in bibliotecs"
          :key="bibliotec.id"
          :img-src="!bibliotec.photo ?  'https://picsum.photos/600/300/?image=26' : bibliotec.photo"
          :img-alt="bibliotec.name"
          img-top
          tag="article"
        >
          <b-card-title title-tag="h5">
            <div class="d-flex justify-content-between">
              <span>{{ bibliotec.name }}</span>
              <div style="white-space: nowrap;">
                <b-button size="sm" variant="link" title="Editar" @click="editBibliotec(bibliotec)">
                  <i class="fa-solid fa-pen-to-square text-warning"></i>
                </b-button>
                <b-button size="sm" variant="link" title="Eliminar" @click="deleteBibliotec(bibliotec.id)">
                  <i class="fa-solid fa-trash text-danger"></i>
                </b-button>
              </div>
            </div>
          </b-card-title>
          <b-card-text>
            {{ bibliotec.company.catchPhrase }}
          </b-card-text>

          <b-button
            :to="bibliotec.website"
            target="_blank"
            role="button"
            variant="primary"
          >
            {{ bibliotec.username }}
          </b-button>
        </b-card>
      </div>
    </b-col>
  </b-row>
</template>

<script>
import {
  BRow,
  BCol,
  BCard,
  BCardTitle,
  BCardText,
  BButton,
} from "bootstrap-vue";
import ModalBibliotec from '@/components/ModalBibliotec.vue'
import { getAllBibliotecs, stateInitialBibliotec, deleteBibliotec } from "@/services/bibliotec";

export default {
  name: "HomeView",
  components: {
    BRow,
    BCol,
    BCard,
    BCardTitle,
    BCardText,
    BButton,
    ModalBibliotec,
  },
  data() {
    return {
      modalId: 'modal-bibliotec',
      bibliotecs: [],
      bibliotecActive: { ...stateInitialBibliotec },
      isLoading: true,
    };
  },
  methods: {
    async loadListGrid() {
      const { success, data } = await getAllBibliotecs();
      this.isLoading = false
      if (success) {
        this.bibliotecs = data;
      } else {
        this.$swal({
          title: 'Error!',
          text: 'Ocurrio un error al cargar los datos',
          icon: 'error',
          customClass: {
            confirmButton: 'btn btn-primary',
          },
          buttonsStyling: false,
        });
      }
    },
    newBibliotec() {
      this.bibliotecActive = { ...stateInitialBibliotec }
      setTimeout(() => {
        this.$bvModal.show(this.modalId)
      }, 1);
    },
    editBibliotec(bibliotec) {
      this.bibliotecActive = { ...bibliotec }
      setTimeout(() => {
        this.$bvModal.show(this.modalId)
      }, 1);
    },
    sendBibliotec(bibliotec) {
      const existBibliotec = this.bibliotecs.find(bib => bib.id === bibliotec.id) ?? null
      if (existBibliotec?.id) {
        this.bibliotecs = this.bibliotecs.map(bib => {
          if (bib.id === bibliotec.id) {
            return bibliotec
          }
          return bib
        })
      } else {
        this.bibliotecs.unshift({ ...bibliotec })
      }
    },
    async deleteBibliotec(id) {
      const { isConfirmed } = await this.$swal({
        title: 'Desea eliminar este registro?',
        text: "Si lo elimina, no podra recuperarlo!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, eliminalo!',
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-outline-danger ml-1',
        },
        buttonsStyling: false,
      })
      if (isConfirmed) {
        const { success } = await deleteBibliotec(id)
        if (success) {
          this.bibliotecs = this.bibliotecs.filter(bib => bib.id !== id)
          this.$swal({
            title: 'Exito!',
            text: `El registro (${id}) se elimino con éxito`,
            icon: 'success',
            customClass: {
              confirmButton: 'btn btn-primary',
            },
            buttonsStyling: false,
          });
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
      }
    },
  },
  created() {
    this.loadListGrid();
  },
};
</script>

<style lang="scss">
.list-grid {
  display: grid;
  gap: 1.5em;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
}
</style>
