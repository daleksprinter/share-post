package util

import (
	"errors"
	"github.com/google/uuid"
	"reflect"
	"strings"
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

func GenerateUUID() (string, error) {
	u, err := uuid.NewRandom()
	if err != nil {
		return "", err
	}

	return u.String(), nil
}

func GetFileExtension(filename string) (string, error) {
	if strings.HasSuffix(filename, ".jpeg") {
		return "image/jpeg", nil
	} else if strings.HasSuffix(filename, ".jpg") {
		return "image/jpeg", nil
	} else if strings.HasSuffix(filename, ".png") {
		return "image/png", nil
	} else if strings.HasSuffix(filename, ".gif") {
		return "image/gif", nil
	}

	return "", errors.New("file is not picture, use .jpeg, .jpg, .png or gif data")
}
