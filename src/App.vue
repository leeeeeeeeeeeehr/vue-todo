<script setup>
import { reactive, computed } from 'vue';

// 할 일 리스트가 들어갈 객체
// data 객체를 reactive 함수를 통해 반응성 주입하여 초기화
const data = reactive({
  newItem: '',
  // 배열로 해놔야 여러 개를 추가할 수 있음
  items: [],
});

function addItem() {
  if (data.newItem !== '') {
    // 처음에 데이터가 들어오면 items 배열에 넣어줌
    data.items.push({
      // id는 데이터를 구별할 수 있는 고유값이기 때문에 꼭 들어가야 함
      // 최초에는 빈 배열이기 때문에 0이라서 1로 시작할 수 있게 함
      id: data.items.length + 1,
      text: data.newItem,
      // 완료인지 아닌지 확인하기 위한 초기 값 (completed가 true로 바뀌면 할 일이 완료된 것)
      completed: false,
    });
    // 할 일을 추가한 뒤에 입력 칸에 있는 내용을 빈 칸으로 초기화
    data.newItem = '';
  }
}

// 할 일 갯수
const totalItems = computed(() => data.items.length);

// 완료 갯수
// item의 completed가 true인 것을 찾기 위해 filter로 조건을 걸어줌
// 화살표 함수를 사용할 떄 두 줄 이상이 들어가면 중괄호를 써줘야 함 -> 이 때, return을 빼먹으면 안됨
// === true는 생략 가능
const isComplete = computed(() => {
  return data.items.filter((item) => item.completed === true).length;
});

// 어떤 걸 지워야할지 알아야하기 때문에 id를 인자로 받음
function deleteItem(id) {
  // find로 id가 일치하는 요소 찾기
  const itemToDelete = data.items.find((item) => item.id === id);
  // 찾은 요소의 위치(index) 찾기
  const index = data.items.indexOf(itemToDelete);

  // // 위의 요소를 찾고 위치를 찾는 코드를 한 줄로 줄인 코드
  // const index = data.items.findIndex((item)=>item.id === id);

  // 해당 위치에 있는 요소를 1개 지움
  data.items.splice(index, 1);
}
</script>

<template>
  <main class="app">
    <h1>Simple to-do</h1>
    <div class="todo_count">
      완료: {{ isComplete }} / 할 일: {{ totalItems }}
    </div>
    <div class="todo_add">
      <input
        type="text"
        placeholder="할 일을 입력하세요"
        title="할 일을 입력하세요"
        v-model="data.newItem"
        v-on:keyup.enter="addItem()"
      />
      <button type="button" class="add_btn" v-on:click="addItem()">Add</button>
    </div>
    <ul class="todo_list">
      <li
        v-for="item in data.items"
        v-bind:key="item.id"
        v-bind:class="{ completed: item.completed }"
      >
        <!-- 문자와 변수를 한 번에 넣기 위해 `(=백틱) 사용 -->
        <input
          type="checkbox"
          v-bind:id="`check${item.id}`"
          v-model="item.completed"
        />
        <label v-bind:for="`check${item.id}`">{{ item.text }}</label>
        <button
          type="button"
          class="remove_btn"
          v-on:click="deleteItem(item.id)"
        >
          Remove
        </button>
      </li>
    </ul>
  </main>
</template>

<style scoped>
.app {
  padding: 40px;
}
.app h1 {
  font-size: 30px;
  font-weight: 700;
  margin-bottom: 20px;
}

.todo_count {
  margin: 10px 0;
}

.todo_add {
  display: flex;
}
.todo_add input[type='text'] {
  height: 40px;
  padding: 0 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: calc(100% - 60px);
}
.todo_add .add_btn {
  height: 40px;
  padding: 0 10px;
  border-radius: 4px;
  margin-left: 10px;
  color: #fff;
  background: #333;
  border: none;
}

.todo_list {
  margin-top: 20px;
}
.todo_list li {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
.todo_list label {
  flex-grow: 1;
}
.todo_list li.completed label {
  color: #ccc;
  text-decoration: line-through;
}
.todo_list .remove_btn {
  margin-left: auto;
  height: 32px;
  padding: 0 5px;
  background: none;
  border: 1px solid #b83030;
  color: #b83030;
  border-radius: 4px;
  margin-left: 20px;
}
</style>
