package com.Kosten.Api_Rest.Exception;

import java.util.Map;

public record ApplicationExceptionResponse(
  Boolean isError,
  String dateTime,
  Integer statusCode,
  String path,
  Map<String, String> messages) {
}
