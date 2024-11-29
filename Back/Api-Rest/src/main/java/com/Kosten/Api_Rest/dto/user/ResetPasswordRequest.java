package com.Kosten.Api_Rest.dto.user;

import java.io.Serializable;

public record ResetPasswordRequest(
        String token,
        String newPassword

) implements Serializable {
}
