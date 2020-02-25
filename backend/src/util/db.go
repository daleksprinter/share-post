package util

import (
	"reflect"
)

func NamedExecMap(inf interface{}) map[string]interface{} {
	tof := reflect.TypeOf(inf)
	vof := reflect.ValueOf(inf)
	var entityMap map[string]interface{}
	entityMap = make(map[string]interface{})
	for i := 0; i < tof.NumField(); i++ {
		tag := tof.Field(i).Tag.Get("db")
		val := vof.Field(i).Interface()
		entityMap[tag] = val
	}
	return entityMap

}
