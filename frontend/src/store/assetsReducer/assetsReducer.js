const initialState = {
  assets: [],
  reit: [],
  auto: [],
  user: {},
  dataModal: false,
  sellModal: false,
  reitUpdate: []
};

const assetsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ASSETS":
      return { ...state, assets: action.payload };

    case "REIT":
      return { ...state, reit: action.payload };

    case "AUTO":
      return { ...state, auto: action.payload };

    case "AddUser":
      return { ...state, user: action.payload };

    case "DelUser":
      return { ...state, user: {} };

    case "DATA_MODAL": 
    if(state.dataModal){
      return {...state, dataModal: initialState.dataModal}
    }else{
     return {...state, dataModal: true}
    }

    case "SELL_MODAL": 
    if(state.sellModal){
      return {...state, sellModal: initialState.sellModal}
    }else{
     return {...state, sellModal: true}
    }

    case "POST_REIT":
      return { ...state, reit: [...state.reit, action.payload]  };

      case "POST_AUTO":
      return { ...state, auto: [...state.auto, action.payload]  };

      case "DELETE_REIT":
        return {...state, reit: state.reit.filter((el) => el.id !== action.payload)}

        case "DELETE_AUTO":
        return {...state, auto: state.auto.filter((el) => el.id !== action.payload)}

    default:
      return state;
  }
};

export default assetsReducer;
