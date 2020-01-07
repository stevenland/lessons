<template>
  <div class="container mt-3">
    <app-input-panel v-if="!paperSize" @setPaperSize="paperSize=$event"></app-input-panel>
    <div v-if="paperSize">
      <h5
        class="text-center text-success"
      >A piece of paper has a fixed area. What height will give the maximum volume?</h5>
      <div class="row mt-3">
        <div class="col-md-6">
          <table class="table text-center" style="table-layout: fixed;">
            <tr>
              <th>
                Area(cm
                <sup>2</sup>)
              </th>
              <td>{{ area }}</td>
            </tr>
            <tr>
              <th>Paper height(cm)</th>
              <td>{{ height }}</td>
            </tr>
            <tr>
              <th>Paper width(cm)</th>
              <td>{{ width }}</td>
            </tr>
            <tr>
              <th>Current height(cm)</th>
              <td>{{ currentHeight }}</td>
            </tr>
            <tr>
              <th></th>
              <td>
                <div class="form-check">
                  <input
                    type="radio"
                    class="form-check-input"
                    id="increase"
                    name="incDec"
                    :value="1"
                    v-model="incDec"
                  />
                  <label for="increase" class="form-check-label">Increase height</label>
                </div>
                <div class="form-check">
                  <input
                    type="radio"
                    class="form-check-input"
                    id="decrease"
                    name="incDec"
                    :value="-1"
                    v-model="incDec"
                  />
                  <label for="decrease" class="form-check-label">Decrease height</label>
                </div>
              </td>
            </tr>
            <tr>
              <th>Enter increment(cm)</th>
              <td>
                <input class="form-control" name="increment" v-model="increment" type="number" />
                <br />
                <button
                  class="btn btn-outline-success"
                  @click="handleOK"
                  :disabled="!isValidInput"
                >OK</button>
                <p class="text-danger mt-2">
                  {{ incDec > 0 ?
                  "Enter a positive number equal or less than 10"
                  : "Enter a positive number less than or equal to the current height"
                  }}
                </p>
              </td>
            </tr>
          </table>
        </div>
        <div class="col-md-6">
          <table class="table table-bordered text-center">
            <tr>
              <th>Height(cm)</th>
              <th>Radius(cm)</th>
              <th>Volume(L)</th>
            </tr>
            <tr
              v-for="(data, index) in resultArr"
              :key="index"
              :class="{'table-primary': index===maxIndex }"
            >
              <td>{{ data.height }}</td>
              <td>{{ data.radius }}</td>
              <td>{{ data.volume }}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import InputPanel from "./InputPanel.vue";
import { calculateRadius, calculateArea, calculateVolumne } from "./utils";

export default {
  components: {
    appInputPanel: InputPanel
  },
  data: function() {
    return {
      paperSize: null,
      currentHeight: 0,
      incDec: 1,
      increment: null,
      resultArr: [],
      maxIndex: -1
    };
  },
  watch: {
    paperSize(value) {
      if (value) {
        this.currentHeight = this.paperSize.length;
        const [height, radius, volume] = this.calculate(this.currentHeight);
        this.resultArr.push({
          height,
          radius: Number(radius.toFixed(6)),
          volume: Number(volume.toFixed(6))
        });
      } else {
        this.currentHeight = 0;
        this.resultArr = [];
        this.maxIndex = -1;
        this.increment = null;
        this.incDec = 1;
      }
    }
  },
  computed: {
    height() {
      return this.paperSize ? this.paperSize.length : 0;
    },
    width() {
      return this.paperSize ? this.paperSize.width : 0;
    },
    area() {
      return this.paperSize ? this.paperSize.length * this.paperSize.width : 0;
    },
    isValidInput() {
      if (this.incDec > 0 && this.increment > 0 && this.increment < 10) {
        return true;
      }
      if (
        this.incDec < 0 &&
        this.increment > 0 &&
        this.increment <= this.currentHeight
      ) {
        return true;
      }
      return false;
    }
  },
  methods: {
    handleOK() {
      if (!this.isValidInput) {
        return;
      }
      this.resultArr = [];
      //  this.currentHeight = this.height;
      let count = 0;
      while (count <= 10 && this.currentHeight > 0) {
        const [height, radius, volume] = this.calculate(this.currentHeight);
        this.resultArr.push({
          height: height,
          radius: Number(radius.toFixed(2)),
          volume: Number(volume.toFixed(2))
        });
        count++;
        if (count >= 10) {
          break;
        }
        let nextCurrentHeight = Number(
          (this.currentHeight + this.incDec * this.increment).toFixed(10)
        );
        if (nextCurrentHeight <= 0) {
          break;
        }
        this.currentHeight = nextCurrentHeight;
      }

      let maxVolume = this.resultArr[0].volume;
      let maxIndex = 0;
      for (let i = 0; i < this.resultArr.length; i++) {
        if (this.resultArr[i].volume > maxVolume) {
          maxIndex = i;
          maxVolume = this.resultArr[i].volume;
        }
      }
      this.maxIndex = maxIndex;
    },
    calculate(height) {
      let width = this.area / height;
      let radius = calculateRadius(width);
      let area = calculateArea(radius);
      let volume = calculateVolumne(area, height) / 1000;
      return [height, radius, volume];
    }
  }
};
</script>

<style scoped></style>